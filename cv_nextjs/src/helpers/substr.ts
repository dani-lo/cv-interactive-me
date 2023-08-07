export const substrNice = (str: string, substrLength: number) : string => {
    const arrParts = str.split(' ')
    
    let charsAdded = 0
    let strNew = ''

    for (const strPart of arrParts) {
        if (charsAdded < substrLength) {
            strNew = `${ strNew } ${ strPart }`

            charsAdded += strPart.length + 1
        }
    }

    return strNew

}