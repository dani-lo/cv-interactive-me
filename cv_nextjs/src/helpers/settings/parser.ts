import { generateUserTok } from "../userTok"

export enum SettingKeys {
    ShowPersistFeedback = "show_persist_feedback",
    AutoPersist = "auto_persist",
    UserTok = "user_token",
}

export const settingLabel = (s: SettingKeys) => s.replace(/_/g, ' ')

enum SettingDependencyKey {
    ChangeValue = 'changevalue',
    Disable = 'disable',
}
export interface AppSetting<T extends (string | number | boolean)> {
    val: T | null,
    disabled: boolean,
    default: T,
    key: SettingKeys,
    desc: string,
    force: boolean,
    validate ?: (v: T) => boolean,
    depends ?: {
        [k: string] : (k: SettingKeys, v: T) => boolean | T
    }
}

const defaultSettings = [ 
    {
        key: SettingKeys.ShowPersistFeedback,
        disabled: false,
        val: null,
        default: true,
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
        force: false,
    },
    {
        key: SettingKeys.AutoPersist,
        disabled: false,
        val: null,
        default: false,
        desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore',
        force: false,
    },
    {
        key: SettingKeys.UserTok,
        disabled: false,
        val: null,
        default: generateUserTok(),
        desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore',
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

    private parseStorageSettings () {

        const parsedSettigs = this.settings.map(setting => {

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

        // TODO :: run post parse dependency resolution
        this.settings = [...parsedSettigs]
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