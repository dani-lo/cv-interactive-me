import { ConcreteMdel, Model } from "../models/model";
import { Resource, ResourceType } from "../types";

export const deepLinkSelected = (resource: Resource) => {
    window.history.pushState({}, '', `/${ resource.toUrl() }/${ resource.id }`)
}

export const unLinkSelected = (resource: ResourceType) => {

    const url = resource == ResourceType.Job ? '/jobs' : '/projects'
    window.history.pushState({}, '', url)
}