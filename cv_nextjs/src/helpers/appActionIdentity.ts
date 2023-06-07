import { AppAction } from "../types";

export const appActionIdentity = (a: AppAction, b: AppAction) => {
    return a.resource_id == b.resource_id && a.resource_type == b.resource_type
}