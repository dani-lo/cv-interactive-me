import { AppState, AppStatePayload } from "../store/appState"
import { itemCanBePending } from "./typeNarrowers"

const isPending = (res: AppStatePayload) => {
    return itemCanBePending(res) && res.pending !== null
}

export const pendingAppstateActions = (state: AppState) => {
    
    return  Object.values(state)
        .filter(resourceArray => resourceArray.some(isPending))
        .map(resourceArray => resourceArray.filter(isPending))
}