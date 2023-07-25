import { Job } from "../models/classes/Job"
import { Project } from "../models/classes/Project"

export const techsWithMonthsDuration = (
        items: (Job | Project)[]
    ) : Map<number, number> => {

    const weights = new Map()

    items.forEach((jobOrperiod) => {
 
        const techs = jobOrperiod.tech

        techs.forEach((tech) => {
            if (!weights.has(tech.uid)) {
                weights.set(tech.uid, 0)
            }

            const curr = weights.get(tech.uid)

            weights.set(tech.uid, curr + 1)
        })
    })

    return weights
}

export const techWeight = (
        techId: number, 
        techWeights: Map<number, number>, 
        maxTechWeight: number
    ) : number => {

    let thisWeight = techWeights.get(techId)

    if (!thisWeight) {
        return 0
    }

    let percent = (100  * thisWeight) / maxTechWeight;

    if (percent > 75) {
        return 26
    } else if (percent > 50) {
        return 22
    } else if (percent > 25) {
        return 18
    } else {
        return 14
    }
}