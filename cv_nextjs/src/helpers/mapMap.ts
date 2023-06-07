export const mapToComponents = <T>(
        map: Map<any, T>, 
        transform: (v: T, i: number) => JSX.Element | null
        
        )  => {

    const components = []

    let i = 0 

    // @ts-ignore
    for (const value of map.values()) {
        components.push(transform(value, i))
    
        i++
    }

    return components
}