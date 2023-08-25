// import { ICompany, IField, IJob, IJobType, IProject, ITech } from '../../src/types'
import * as configs from '../config'

const getJobs = async () => {

  return await fetch(configs.URL_GET_JOB)
    .then(response => response.json())
    .then(json => {
      return json
    })
}

const getTechs = async () => {
  
  return await fetch(configs.URL_GET_TECHS)
    .then(response => response.json())
    .then(json => {
      return json
    })
}

const getCompanies = async () => {

  return await fetch(configs.URL_GET_COMPANIES)
    .then(response => response.json())
    .then(json => {
      return json
    })
}

const getFields = async () => {

  return await fetch(configs.URL_GET_FIELDS)
    .then(response => response.json())
    .then(json => {
      return json
    })
}

const getJobtypes = async () => {

  return await fetch(configs.URL_GET_JOB_TYPES)
  .then(response => response.json())
    .then(json => {
      return json
    })
}

const getProjects = async () => {

  return await fetch(configs.URL_GET_PROJECTS)
    .then(response => response.json())
    .then(json => {
      return json
    })
}

export const getStaticData = async ()  => {
  
  return await Promise.all([
    getJobs(),
    getTechs(),
    getCompanies(),
    getFields(),
    getJobtypes(),
    getProjects(),
  ])
}

