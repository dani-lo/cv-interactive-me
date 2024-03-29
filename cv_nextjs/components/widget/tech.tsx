import React, { useContext, useState } from "react"
import { ActionItem, Resource, ResourceProps, ResourceType } from "../../src/types"

import * as ArrayClause from '../../src/helpers/arrayClauses'

import { Tech } from "../../src/models/classes/Tech"

import { StyledTechList } from '../../styles/main.styled'

import { CvJobsContext } from "../../pages/_app"
import { namedListSort } from "../../src/helpers/sort"
import { isUnique } from "../../src/helpers/filterBy"

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

    const ctx = useContext(CvJobsContext)

    if (!ctx) {
        return null
    }

    const filters = ctx.appstate.filters

    return <StyledTechList>
        {   
            props.techs.filter(isUnique).sort(namedListSort).map(tech => {

                const filtered = !!(filters.find(ArrayClause.findClause(tech, ResourceType.Tech)))

                return <TechComponent
                    tech={ tech } 
                    showActions={ props.showActions }
                    filtered={ filtered }
                    key={ tech.uid }
                />
            })
        }
    </StyledTechList>
}

const TechComponent = React.memo<TechProps>(

    (props : TechProps) => {

        const { showActions, filtered, tech } = props

        return <li 
                className={ `itemised ${ filtered? 'filtered' : '' }` } 
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