import React, { useContext, useState } from "react"
import { ActionItem, Resource, ResourceProps, ResourceType } from "../../src/types"

import * as ArrayClause from '../../src/helpers/arrayClauses'

import { Tech } from "../../src/models/classes/Tech"

import { techShowLimit } from '../../src/config'
import { CvJobsContext } from "../../pages/_app"
import { StyledActionsList } from "../../styles/main.styled"

type TechProps = {
    showActions: (item: Resource) => void;
    filtered: boolean;
    tech: Tech;
}

type TechListProps = {
    techs: Tech[];
    showActions: (item: Resource) => void,
}

export const TechListComponent = (props: TechListProps) => {

    const [fulltech, setFulltech] = useState(false)
    const ctx = useContext(CvJobsContext)

    if (!ctx) {
        return null
    }

    const limit = fulltech ? props.techs.length :  techShowLimit
    const filters = ctx.appstate.filters

    return <StyledActionsList>
        {   
            props.techs.slice(0, limit).map(tech => {

                const filtered = !!(filters.find(ArrayClause.findClause(tech, ResourceType.Tech)))

                return <TechComponent
                    tech={ tech } 
                    showActions={ props.showActions }
                    filtered={ filtered }
                    key={ tech.uid }
                />
            })
        }
        {
            !fulltech && limit < props.techs.length ?
                <li className="list-footer-meta-action" onClick={ () => setFulltech(true)}>show more</li> :
                    fulltech ? 
                        <li className="list-footer-meta-action" onClick={ () => setFulltech(false)}>show less</li> :
                        null
        }
    </StyledActionsList>
}

const TechComponent = React.memo<TechProps>(

    (props : TechProps) => {

        const { showActions, filtered, tech } = props

        return <li 
                className={ `${ filtered? 'filtered' : '' }` } 
                onClick={ () => showActions(tech) } > 
            <span className="action-wrap">
                <i 
                    className="action fa fa-plus" 
                    aria-hidden="true"
                />  
                  
                <span>{ tech.name }</span>
            </span>
        </li>
    },
    (p, c) => p.tech.uid == c.tech.uid && p.filtered == c.filtered
)

TechComponent.displayName = 'TechComponent'