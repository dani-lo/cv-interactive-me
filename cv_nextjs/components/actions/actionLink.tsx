import { useAtom } from "jotai";
import { itemCanLink } from "../../src/helpers/typeNarrowers";

import { ILink } from "../../src/models/mixins/withLink";

import { Resource } from "../../src/types";
import { resourceUrlToAtom } from "../../src/store-jotai/atomicUiStore";
import { deepLinkSelected } from "../../src/helpers/deeplinkSelected";
import Link from "next/link";

export const ActionLink = ({ resource }: { resource: Resource }) => {

    const [_, setResourceUrlToAtom] = useAtom(resourceUrlToAtom)

    if (itemCanLink(resource)) {

        const href = (resource as ILink).getSearchString()

        return <Link
            href={ href }>
            
                { resource.toString() }
            </Link>
    }

    return <span>{ resource.toString() }</span>
}