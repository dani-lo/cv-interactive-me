import { StyleFilteredOutCardWarning } from "../../styles/main.styled"

export const FilteredOutCardWarningComponent = () => {
    return <StyleFilteredOutCardWarning>
        <h3>this item is filtered out</h3>
        <p>edit filters to include this item</p>
        <i className="fa fa-exclamation-triangle" />
    </StyleFilteredOutCardWarning>
}