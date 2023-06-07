import { WithUid } from './../types'

export const mappedResource = <T, I>(
        resource:( T & WithUid)[], 
        transform: (res: T) => I) : Map<number, I> => {

    const mappedArray : [number, I][] = (resource || []).map(res => [res.uid, transform(res)])
    
    return new Map([...mappedArray])
}