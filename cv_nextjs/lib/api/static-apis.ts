import axios from 'axios'
import { ICompany, IField, IJob, IJobType, IProject, ITech } from '../../src/types'
import * as configs from '../../src/config'

const getJobs = async () => {
  console.log(configs.URL_GET_JOB)
  return await axios.get(configs.URL_GET_JOB)
    .then(({data}) => {        
        return data as IJob[]
    })
}

const getTechs = async () => {
  
  return await axios.get(configs.URL_GET_TECHS)
    .then(({data}) => {
        return data as ITech[]
    })
}

const getCompanies = async () => {

  return await axios.get(configs.URL_GET_COMPANIES)
  .then(({data}) => {
      return data as ICompany[]
  })
}

const getFields = async () => {

  return await axios.get(configs.URL_GET_FIELDS)
  .then(({data}) => {
      return data as IField[]
  })
}

const getJobtypes = async () => {

  return await axios.get(configs.URL_GET_JOB_TYPES)
  .then(({data}) => {
      return data as IJobType[]
  })
}

const getProjects = async () => {

  return await axios.get(configs.URL_GET_PROJECTS)
  .then(({data}) => {
      return data as IProject[]
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

