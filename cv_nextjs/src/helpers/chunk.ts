import { Resource } from "../types";

export const chunker = <T>(items: T[], chunkSize: number) : T[][] => {

    const chunks = [] 

    while (items.length > 0) {
        
        const chunk = items.splice(0, chunkSize)

        chunks.push(chunk)
    }

    return chunks
}