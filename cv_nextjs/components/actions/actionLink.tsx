import { useAtom } from "jotai";
import { itemCanLink } from "../../src/helpers/typeNarrowers";

import { ILink } from "../../src/models/mixins/withLink";

import { Resource } from "../../src/types";
import * as atoms from "../../src/store-jotai/atomicUiStore";
import { deepLinkSelected } from "../../src/helpers/deeplinkSelected";
import Link from "next/link";

export const ActionLink = ({ resource }: { resource: Resource }) => {

    const [showactions, setShowactions] = useAtom(atoms.uiShowActionsAtom)

    if (itemCanLink(resource)) {

        const href = (resource as ILink).getSearchString()

        return <Link
            legacyBehavior
            href={ href }>
            
                <a onClick={ () => {
                    setShowactions(false) 
                }}>{ resource.toString() }</a>
            </Link>
    }

    return <span>{ resource.toString() }</span>
}