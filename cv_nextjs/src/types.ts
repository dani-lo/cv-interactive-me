import { Company } from "./models/classes/Company";
import { Field } from "./models/classes/Field";
import { Job } from "./models/classes/Job";
import { JobType, JobtypePrefix } from "./models/classes/JobType";
import { Project } from "./models/classes/Project";
import { Tech } from "./models/classes/Tech";
import { IAnnotate } from "./models/mixins/withAnnotate";
import { IBookmark } from "./models/mixins/withBookmark";
import { IFilter } from "./models/mixins/withFilter";

import { AppState, AppStateAction, AppStatePayload } from "./store/appState";

const tuple = <T extends number[]>(...args: T) => args;

const months = tuple(1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10, 11, 12);
const years = tuple(2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,2018, 2019, 2020, 2021, 2022);

export type JobMonth = typeof months[number]
export type JobYear = typeof years[number]

export type Constructor<T> = new (...args: any[]) => T;

export type AppDataProps = {
    jobs: IJob[], 
    tech: ITech[], 
    companies: ICompany[], 
    fields: IField[], 
    jobTypes: IJobType[],
    projects: IProject[]
}

export type CvContext = {
    appstate: AppState;
    dispatch: (action : {
        type: AppStateAction,
        payload: AppStatePayload
    }) => void;
}

export type ActionItem = IAnnotate | IFilter | IBookmark

export type Resource = Job | Company | Tech | Field | JobType | Project

export type ResourceProps = {
    resource: Resource
}

export type JobPeriod = {
    from: Date;
    to: Date;
}

export enum ResourceType {
    'Job' ='Job',
    'Tech' = 'Tech',
    'Company' = 'Company',
    'Field' = 'Field',
    'JobType' = 'JobType',
    'Project' = 'Project'
}

export type AppAction = {
    resource_type: ResourceType;
    resource_id: number;
    text ?: string;
}

export type Filter = AppAction
export type Bookmark = AppAction
export type Annotation = AppAction

export type Collectable = { _id: string | undefined }
export type WithUid = { uid: number }

export interface IJob  {
    uid: number;
    title: string;
    description: string[];
    position: string;
    tech: number[];
    from: [JobMonth, JobYear];
    to: [JobMonth, JobYear];
    jobType: number[];
    company ?: number;
}

export interface IField {   
    uid: number;
    name: string;
}

export interface ITech  {
    uid: number;
    name: string;
}
export interface ICompany {
    uid: number;
    name: string;
    description: string;
    field: number[];
}

export interface IJobType {
    uid: number;
    name: string;
    prefix: JobtypePrefix
}

export interface IProject {
    uid: number;
    name: string;
    description: string[];
    status: string[];
    live_url: string;
    tech: number[];
    repo: string;
}