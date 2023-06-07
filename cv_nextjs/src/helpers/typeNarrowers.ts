import { IAnnotateKeys } from "../models/mixins/withAnnotate"
import { IBookmarkKeys } from "../models/mixins/withBookmark"
import { IFilterKeys } from "../models/mixins/withFilter"
import { AppstateKeys, AppStatePending } from "../store/appState"
import { Resource } from "../types"

export const itemCanFilter = (item: Resource | null): boolean => !!item && IFilterKeys.DO_ACTION in item
export const itemCanBookmark = (item: Resource | null): boolean  => !!item && IBookmarkKeys.DO_ACTION in item
export const itemCanAnnotate = (item: Resource | null) : boolean => !!item && IAnnotateKeys.DO_ACTION in item

export const itemCanLink = (item: Resource | null) : boolean => !!item && 'getSearchString' in item

export const itemCanBePending = (item: any) : item is AppStatePending => item !== null && 'pending' in item