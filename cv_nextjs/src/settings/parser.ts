import { generateUserTok } from "../helpers/userTok"

export enum SettingKeys {
    ShowPersistFeedback = "show_persist_feedback",
    AutoPersist = "auto_persist",
    UserTok = "user_token",
}

export const settingLabel = (s: SettingKeys) => s.replace(/_/g, ' ')

export interface AppSetting<T extends (string | number | boolean)> {
    val: T | null,
    disabled: boolean,
    default: T,
    key: SettingKeys,
    desc: string,
    force: boolean,
    validate ?: (v: T) => boolean,
    disableIf ?: {
        ifKey: SettingKeys,
        ifVal: T,
    },
}

const defaultSettings = [ 
    {
        key: SettingKeys.ShowPersistFeedback,
        disabled: false,
        val: null,
        default: true,
        desc: 'If set to true, the app will automatically persist your changes: they will be saved to database and indexed under your user token.',
        force: false,
        disableIf: {
            ifKey: SettingKeys.AutoPersist,
            ifVal: true,
        }
    },
    {
        key: SettingKeys.AutoPersist,
        disabled: false,
        val: null,
        default: false,
        desc: 'If set to true, the app will always ask you to manually persist your changes.',
        force: false,
    },
    {
        key: SettingKeys.UserTok,
        disabled: false,
        val: null,
        default: generateUserTok(),
        desc: 'Change this value to use a custom user token: this could be done for example to be able to use somebody else token, and thus see their bookmarks, annotations etc.',
        validate: (v: string) => v.length == 5,
        force: true,
    },
]

export class AppSettingsParser  {
    
    settings: AppSetting<any>[] = []

    constructor (isSSR: boolean = false) {

        this.settings = defaultSettings
        
        if (!isSSR) {
            this.parseStorageSettings()
        }
        
    }
    
    get allSettings () {
        return this.settings
    }

    private isDisabled (setting: AppSetting<any>) : boolean {

        if (!!setting.disableIf) {

            const val = this.getSetting(setting.disableIf.ifKey)

            console.log(val, setting.disableIf.ifVal)

            if (val === setting.disableIf.ifVal) {
                return true
            }
        }

        return setting.disabled
    }

    private parseStorageSettings () {

        const parsedSettings = this.settings.map(setting => {

            let storageVal = localStorage.getItem(setting.key)

            if (storageVal == null) {
                const defaultVal = setting.default

                if (setting.force) {
                    this.saveSetting(setting.key, defaultVal)
                }
                return { ...setting, val: defaultVal }
            }

            switch (true) {
                
                case storageVal.match(/^\d+$/) !== null:
                    return { ...setting, val: parseInt(storageVal) } as unknown as AppSetting<number>
                case ['false', 'true'].includes(storageVal):
                    return { ...setting, val: storageVal == 'false' ? false : true } as AppSetting<boolean>
            }

            return { ...setting, val: storageVal } as unknown as AppSetting<string>
        })
        
        // TODO refactor this double assign rubbish 
        this.settings = parsedSettings

        this.settings = parsedSettings.map(setting => {
            return {
                ...setting,
                disabled: this.isDisabled(setting)
            }
        })

        console.log(this.settings)
    }

    getSetting (k: SettingKeys) : string | number | boolean {

        const setting = this.settings.find(s => s.key == k)

        if (setting === undefined) {
            throw new Error()
        }

        return setting.val 
    }

    saveSetting<T extends (string | number | boolean)> (k: SettingKeys, v: T) {
        
        const setting = this.settings.find(s => s.key == k)

        if (setting === undefined) {
            throw new Error()
        }

        localStorage.setItem(k, v.toString())
    
        this.parseStorageSettings()
    }
}