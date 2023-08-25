/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

//type ActionAPiResponse<T> = AxiosResponse<{ data: { [k in AppstateKeys]: T } }, any>

// export const getUserFilters = async (
//         apiUser ?: User & Collectable
//     ) : Promise<ActionAPiResponse<(Filter & Collectable)[]>> => {
    
//     const user = apiUser || await getUser()

//     if (!user._id) {
//         throw new Error('Can not invoke actions api if user is not logged')
//     }

//     try {
//         return axios.get(`${ URL_ACTIONS.FILTERS }/${ user._id }`)
//     } catch (err) {

//         console.log(err)

//         throw new Error('Error getting user filters')
//     }
// }

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

//////////////////// $$$

const tuple = <T extends number[]>(...args: T) => args;

const months = tuple(1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10, 11, 12);
const years = tuple(2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,2018, 2019, 2020, 2021, 2022);

export type JobtypePrefix = "PLACE" |  "TIME"

export type JobMonth = typeof months[number]
export type JobYear = typeof years[number]

export type JobPeriod = {
    from: Date;
    to: Date;
}

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
