export type FormFieldsObject = { [k: string] : string | number }

export const formDataFieldsCast = (formDataFields: {
    [k: string] : string;
}) : FormFieldsObject  => {

    return Object.keys(formDataFields).reduce((acc, curr) => {

        const castValue = Number(formDataFields[curr])
        
        acc[curr] = isNaN(castValue) ? formDataFields[curr] : castValue

        return acc
    }, {} as { [k: string] : string | number })
}

export const urlSearchParamsToBody = <T extends FormFieldsObject>(reqParams: URLSearchParams) : T  => {
    
    const bodyObj = {} as { [k: string] : string }

    for(const [k, v] of reqParams) {
        bodyObj[k] = v
    }
    
    return formDataFieldsCast(bodyObj) as T
}