import { StyledCompanyContainer } from '../../styles/main.styled'
import { Company } from "../../src/models/classes/Company"
import { Field } from '../../src/models/classes/Field'
import { Resource, ResourceProps } from '../../src/types'

export const CompanyComponent = (props : { 
    company: Company ,
    showActions: (item: Resource) => void,
    bookmarked: boolean,
}) => {

    const { company, showActions, bookmarked } = props

    if (!(company instanceof Company)) {
        throw new Error("You must pass a Company resource to the CompanyComponent")
    }

    return <StyledCompanyContainer>
        <h3 onClick={ () => showActions(company) } >
            <span className="action-wrap">
                <i 
                    className="action fa fa-plus" 
                />
                <span>{ company.name }</span>
            </span>
            {
                bookmarked ? <i className="fa fa-bookmark bookmark" /> : null
            }
        </h3>
        <p>{ company.description }</p>
        <ul>
            { 
                company.field.map(f => <CompanyFieldComponent  key={ f.uid } field={ f } showActions={ showActions } />) 
            }
        </ul>
    </StyledCompanyContainer>
}

const CompanyFieldComponent = (props : { field: Field, showActions: (r: Resource) => void }) => {

    const { field, showActions } = props

    if (!(field instanceof Field)) {
        throw new Error("You must pass a Field resource to the CompanyComponent")
    }

    return <li className="itemised" onClick={ () => showActions(field) }>
        <span className="action-wrap evident">
            <i 
                className="action fa fa-plus" 
                aria-hidden="true"
            />  
                
            <span>{ field.name  }</span>
        </span>
    </li>
}