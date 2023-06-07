export const groupBy = <T>(ungroupedItemsArray: T[],  groupbyItemKey: keyof T) : T[] => {
    
    let groupedArray : T[] = []
    
    const groupedMap : Map<T[keyof T], any> = ungroupedItemsArray.reduce((
            groupedMapAcc: Map<T[keyof T], any>, 
            currItem: T) => {

        const keyValue  = currItem[groupbyItemKey]

        if (!groupedMapAcc.has(keyValue)) {
            groupedMapAcc.set(keyValue, [])
        }

        groupedMapAcc.get(keyValue).push(currItem)

        return groupedMapAcc
    }, new Map())

    groupedMap.forEach((v, k) => {
        groupedArray = groupedArray.concat(v)
    })

    return groupedArray
}
  