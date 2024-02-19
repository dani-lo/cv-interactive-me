import { getStaticData } from "./static-apis"

import { memoize } from '../../src/helpers/memo'
import { ICompany, IField, IJob, IJobType, IProject, ITech } from "../../src/types"

type AppStaticData = {
    jobs: IJob[],
    tech: ITech[],
    companies: ICompany[],
    fields: IField[],
    jobTypes: IJobType[],
    projects: IProject[],
}

let d: AppStaticData = {
    jobs: [], 
    tech: [], 
    companies: [], 
    fields: [], 
    jobTypes: [], 
    projects: [],
}

export const getAppStaticPropsBase = (async () : Promise<{props: AppStaticData}> => {

    const [
        jobs, 
        tech, 
        companies, 
        fields, 
        jobTypes, 
        projects,
    ] = await getStaticData()

    console.log('API RES')
    console.log(tech)
    
    return  { props: { 
        jobs, 
        tech, 
        companies, 
        fields, 
        jobTypes, 
        projects,
     }}
})


export const getAppStaticProps = memoize(getAppStaticPropsBase, 'app-resources')