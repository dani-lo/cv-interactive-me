export enum AppstateActionsKeys {
    'FILTERS' = 'filters',
    'ANNOTATIONS' = 'annotations',
    'BOOKMARKS' = 'bookmarks',
}

export enum PendingStatus {
    'SAVED' = 'saved',
    'ADDED' = 'added',
    'DELETED' = 'deleted',
    'EDITED' = 'edited',
    'ADDED_THEN_EDITED' = 'addedEdited',
    'SAVED_THEN_EDITED' = 'saveddEdited',
}

export type ApiActionResult<T> = {
    status: string,
    data: T | T[],
}