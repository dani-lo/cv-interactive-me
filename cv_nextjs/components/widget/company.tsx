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
        <h3 className="margin-top-medium margin-bottom-medium">
            <span className="action-wrap">
                <i 
                    className="action fa fa-plus" 
                    onClick={ () => showActions(company) } 
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
                company.field.map(f => <CompanyFieldComponent  key={ f.uid } field={ f } />) 
            }
        </ul>
    </StyledCompanyContainer>
}

const CompanyFieldComponent = (props : { field: Field }) => {

    const { field } = props

    if (!(field instanceof Field)) {
        throw new Error("You must pass a Field resource to the CompanyComponent")
    }

    return <li>
        { 
            field.name 
        }
    </li>
}