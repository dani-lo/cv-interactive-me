import { useAtom } from "jotai";
import { itemCanLink } from "../../src/helpers/typeNarrowers";

import { ILink } from "../../src/models/mixins/withLink";

import { Resource } from "../../src/types";
import * as atoms from "../../src/store-jotai/atomicUiStore";
import { deepLinkSelected } from "../../src/helpers/deeplinkSelected";
import Link from "next/link";
import { useRouter } from "next/router";

export const ActionLink = ({ resource }: { resource: Resource }) => {

    const [_showactions, setShowactions] = useAtom(atoms.uiShowActionsAtom)

    const router = useRouter()

    if (itemCanLink(resource)) {

        const href = (resource as ILink).getSearchString()

        return <a onClick={ () => {
            setShowactions(false) 
            router.push(href)
        }}>{ resource.toString() }</a>

        // return <Link
        //     legacyBehavior
        //     href={ href }>
        //         <a onClick={ () => {
        //             setShowactions(false) 
        //         }}>{ resource.toString() }</a>
        //     </Link>
    }

    return <span>{ resource.toString() }</span>
}