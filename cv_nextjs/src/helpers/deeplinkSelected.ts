import { ConcreteMdel, Model } from "../models/model";
import { Resource } from "../types";

export const deepLinkSelected = (resource: Resource) => {
    window.history.pushState({}, '', `/${ resource.toUrl() }?uid=${ resource.id }`)
}