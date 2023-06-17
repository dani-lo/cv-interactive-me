
import { atom } from "jotai"
import { AppSetting, AppSettingsParser } from "../settings/parser";

export const uiBusy = atom<boolean>(false);
export const uiMsg = atom<string | null>(null);
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
    (_get, set, _params) => {
        setTimeout(() => {

            set(uiBusy, true)
            set(uiMsg, 'All done!')

            setTimeout(() => {
                set(uiBusy, false)
                set(uiMsg, null)
            }, 1500)
        }, 1500)
    }
)