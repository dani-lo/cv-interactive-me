
import { atom } from "jotai"
import { AppSetting, AppSettingsParser } from "../settings/parser";
import { Resource } from "../types";
import { Job } from "../models/classes/Job";
import { Project } from "../models/classes/Project";

type UiOpStatusOutcome =  'success' | 'error' | 'warning'

type UiOpStatus = {
    outcome:UiOpStatusOutcome,
    msg: string,
}

export const uiBusy = atom<boolean>(false)
export const uiOpStatus = atom<UiOpStatus | null>(null)
export const uiToken = atom<string | null>(null)
export const uiSettingsAtom = atom<AppSetting<any>[]>([])
export const uiSelectedJobAtom = atom<number | null>(null)
export const uiSelectedProjectAtom = atom<number | null>(null)

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

export const resourceUrlToAtom = atom(
    null,
    (_get, set, resUrl: string) => {
        
        const resourceTuple = resUrl.split('/').filter(d => !!d.length)
        const resourceId = resourceTuple[1]
        const resourceName = resourceTuple[0]

        switch (true) {
            case resourceName.indexOf('project') !== -1 :
                set(uiSelectedProjectAtom, parseInt(resourceId))
            break

            case resourceTuple[0].indexOf('job') !== -1 :
                set(uiSelectedJobAtom, parseInt(resourceId))
            break
        }
    }
)

export const clearSelections = atom(
    null,
    (_get, set) => {
        set(uiSelectedJobAtom, null)
        set(uiSelectedProjectAtom, null)
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