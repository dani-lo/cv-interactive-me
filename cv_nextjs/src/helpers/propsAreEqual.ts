import { Resource, ResourceType } from "../types";

export const resourcesAreEqual = (resource_type: ResourceType) => {

    return function (
            prevProps: { [r: string]: Resource }, 
            currProps: { [r: string]: Resource }
        ) {

        const prevRes = prevProps[resource_type]
        const currRes = currProps[resource_type]

        return prevRes.uid == currRes.uid
    }
}