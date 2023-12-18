

export const URL_GET_JOB = process.env.NODE_ENV == 'development' ? 'http://localhost:8080/api/jobs' : 'https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/jobs'
export const URL_GET_TECHS = process.env.NODE_ENV == 'development' ? 'http://localhost:8080/api/techs' : 'https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/tech'
export const URL_GET_COMPANIES = process.env.NODE_ENV == 'development' ? 'http://localhost:8080/api/companies' : 'https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/companies'
export const URL_GET_JOB_TYPES = process.env.NODE_ENV == 'development' ? 'http://localhost:8080/api/jobtypes' : 'https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/jobtypes'
export const URL_GET_FIELDS = process.env.NODE_ENV == 'development' ? 'http://localhost:8080/api/fields' : 'https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/fields'
export const URL_GET_PROJECTS = process.env.NODE_ENV == 'development' ? 'http://localhost:8080/api/projects' : 'https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/projects'
export const URL_GET_PERSONAL = 'personal'

console.log(URL_GET_JOB)

// export const URL_GET_JOB =  'https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/jobs'
// export const URL_GET_TECHS= 'https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/tech'
// export const URL_GET_COMPANIES = 'https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/companies'
// export const URL_GET_JOB_TYPES = 'https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/jobtypes'
// export const URL_GET_FIELDS = 'https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/fields'
// export const URL_GET_PROJECTS = 'https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/projects'
// export const URL_GET_PERSONAL = 'personal'

const URL_ACTIONS_BASE =  process.env.NODE_ENV == 'development' ? 'http://localhost:8000' : 'https://interactiveme.net'

export const URL_ACTIONS = {
    BOOKMARKS: `${ URL_ACTIONS_BASE }/api/bookmarks`,
    FILTERS: `${ URL_ACTIONS_BASE }/api/filters`,
    ANNOTATIONS: `${ URL_ACTIONS_BASE }/api/annotations`,
    USERS: `${ URL_ACTIONS_BASE }/api/users`
}

export const techShowLimit = 500