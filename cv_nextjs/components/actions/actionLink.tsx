import { itemCanLink } from "../../src/helpers/typeNarrowers";

import { ILink } from "../../src/models/mixins/withLink";

import { Resource } from "../../src/types";

export const ActionLink = ({ resource }: { resource: Resource }) => {

    if (itemCanLink(resource)) {
        return <a href={ (resource as ILink).getSearchString() }>{ resource.toString() }</a>
    }

    return <span>{ resource.toString() }</span>
}