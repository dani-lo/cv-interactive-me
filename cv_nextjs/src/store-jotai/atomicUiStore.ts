
import { atom } from "jotai"
import { AppSetting, AppSettingsParser } from "../settings/parser";

type UiOpStatusOutcome =  'success' | 'error' | 'warning'

type UiOpStatus = {
    outcome:UiOpStatusOutcome,
    msg: string,
}

export const uiBusy = atom<boolean>(false)
export const uiOpStatus = atom<UiOpStatus | null>(null)
export const uiToken = atom<string | null>(null)
export const uiSettingsAtom = atom<AppSetting<any>[]>([])

export const uiSettings = atom(
    () => {

        return uiSettingsAtom
    },
    (_get, set, setting: AppSetting<any>) => {
        
        const parser = new AppSettingsParser()        
        parser.saveSetting(setting.key, setting.val)

        set(uiSettingsAtom, parser.allSettings)
    }
)

export const uiOperationSuccess = atom(
    null,
    (_get, set, status: UiOpStatus) => {
        setTimeout(() => {

            set(uiBusy, true)
            set(uiOpStatus, status)

            setTimeout(() => {
                set(uiBusy, false)
                set(uiOpStatus, null)
            }, 1500)
        }, 1500)
    }
)

export const outcomeClassName = (outcome: UiOpStatusOutcome) => {
    switch (outcome) {
        case 'success':
            return 'ok'
        case 'warning':
            return 'warn'
        case 'error':
            return 'err'
    }
}