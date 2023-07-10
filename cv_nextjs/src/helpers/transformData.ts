import { Job } from '../models/classes/Job'
import { Tech } from '../models/classes/Tech'
import { Company } from '../models/classes/Company'
import { JobType } from '../models/classes/JobType'
import { Field } from "../models/classes/Field"

import { mappedResource } from "./mappedResource";

import { 
    AppDataProps,
    ICompany, 
    IField, 
    IJob, 
    IJobType, 
    IProject, 
    ITech,
    Resource,
    ResourceType,
} from '../../src/types'
import { Project } from '../models/classes/Project'

type MappedResources = {
    techModels: Map<number, Tech>,
    companyModels: Map<number, Company>,
    jobtypeModels: Map<number, JobType>,
    fieldModels: Map<number, Field>,
    jobModels: Map<number, Job>,
    projectModels: Map<number, Project>
}

const memoTransformData = () => {

    const memo : MappedResources = {
        techModels: new Map(),
        companyModels: new Map(),
        jobtypeModels: new Map(),
        fieldModels: new Map(),
        jobModels: new Map(),
        projectModels: new Map(),
    }

    return (props: AppDataProps | null) => {
        
        if (props == null) {
            return memo
        }

        const {
            jobs, 
            tech, 
            companies, 
            fields, 
            jobTypes,
            projects
        } = props

        memo.techModels = !!memo.techModels.size ? memo.techModels : mappedResource<ITech, Tech>(tech, (doc: ITech) => new Tech(doc))
        memo.companyModels = !!memo.companyModels.size ? memo.companyModels : mappedResource<ICompany, Company>(companies, (doc: ICompany) => new Company(doc, fields))
        memo.fieldModels = !!memo.fieldModels.size ? memo.fieldModels : mappedResource<IField, Field>(fields, (doc: IField) => new Field(doc))
        memo.jobtypeModels = !!memo.jobtypeModels.size ? memo.jobtypeModels : mappedResource<IJobType, JobType>(jobTypes, (doc: IJobType) => new JobType(doc))

        memo.jobModels = !!memo.jobModels.size ? memo.jobModels : mappedResource<IJob, Job>(jobs, (doc: IJob) => {
            return new Job(
                doc,
                memo.techModels,
                memo.jobtypeModels,
                memo.companyModels,
            )
        }) 

        memo.projectModels = !!memo.projectModels.size ? memo.projectModels : mappedResource<IProject, Project>(projects, (doc: IProject) => {
            return new Project(
                doc,
                memo.techModels,
            )
        }) 
    
        return memo
    }
}

export const grabMappedResource = (
        resource_type: ResourceType, 
        mappedData: MappedResources) : Map<number, Resource> => {
    
    switch (resource_type) {

        case ResourceType.Company:
            return mappedData.companyModels

        case ResourceType.Field:
            return mappedData.fieldModels

        case ResourceType.Job:
            return mappedData.jobModels

        case ResourceType.JobType:
            return mappedData.jobtypeModels

        case ResourceType.Tech:
            return mappedData.techModels

        case ResourceType.Project:
            return mappedData.projectModels
    }
}

export const transformData = memoTransformData()