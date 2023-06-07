import { AppStatePending, PendingStatus } from "../store/appState"
import { Filter } from "../types"

export const allFiltersForDisplay = (filters: (Filter & AppStatePending)[]) => {
    return filters.filter(f => f.pending !== PendingStatus.DELETED) || []
}