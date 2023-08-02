import React from 'react'

import { getAppStaticProps } from '../../lib/api/getAppStaticProps'

import { JobComponent } from '../../components/jobs/job'
import { Job } from '../../src/models/classes/Job'

import { mapToComponents } from '../../src/helpers/mapMap'
import { transformData } from '../../src/helpers/transformData'


import { 
    AppDataProps,
} from '../../src/types'
import { techsWithMonthsDuration } from '../../src/helpers/weightTechs'

export const getStaticProps = getAppStaticProps

const JobsPage = (props: AppDataProps) => {
            
    const { jobModels, projectModels, techModels } = transformData(props)

    const jobs = Array.from(jobModels.values())
    const projects = Array.from(projectModels.values())

    const allTechhavers = [ ...jobs, ...projects ]

    const techs = Array.from(techModels.values())

    return <div className="print">  
        <div className="pers-data">
            <h2 className="dani">
                <strong>Daniele Longo</strong>
                {/* <strong>danielelongo@hotmail.com</strong> */}
            </h2>
            <h2>
                <strong>github.com/dani-lo</strong>
                <strong>interactiveme.net</strong>
            </h2>
        </div>
            
            <h2>Professional Qualities</h2>
            <p>I am an experienced developer, with a positive can do attitude and extensive experience in working within different sized teams, management styles and work arrangements.<br />A naturally respectful and approachable person, I enjoy finding simple solutions to complex problems.</p>
            <h2>Team fit</h2>
            <p>A naturally respectful and approachable person, my extensive experience in working within different sized teams, management styles and work arrangements has given me a solid understanding of work processes and collaborative best practices across all aspects of the professional environment.</p>
            <h2>Skills</h2>
            <ul className="skills">
            {
                techs.map(tech => {
                    return <li key={ tech.name }>{ tech.name }</li>
                })
            }
            </ul>
            <h2>Work</h2>
            {            
                mapToComponents<Job>(jobModels, (job: Job, i: number)  => {

                    const jobtypesTime = job.jobType.filter(jt => jt.prefix == "TIME")
                    const jobtypesPlace = job.jobType.filter(jt => jt.prefix == "PLACE")

                    return  <>
                        <h3> 
                        { job.period.formatted }: { job.position }{ job.company ? `, ${  job.company.name  }` : '' }
                        </h3>
                        <h4>
                        <span> 
                            Type:
                            {
                                jobtypesTime.map((jobTypeItem, i) => {
                                    return <span className="resource-name" key={ jobTypeItem.uid }> { jobTypeItem.name }{ `${ i < jobtypesTime.length - 1 ? ', ' : '' }` }</span>
                                })
                            }
                        </span>
                        <span> - </span>
                        <span> 
                            From: 
                            {
                                jobtypesPlace.map((jobTypeItem, i) => {
                                    return <span className="resource-name" key={ jobTypeItem.uid }> { jobTypeItem.name }{ `${ i < jobtypesPlace.length - 1  ? ', ' : '' }` }</span>
                                })
                            } 
                        </span>
                        </h4>
                        <ul>
                            {
                                job.description.map((task: string) => {
                                    return <li key={ task.replace(/\s/g, '') }>{ task }</li>
                                })
                            }
                        </ul>
                    </>
                })
            }
        </div> 
       
}

export default JobsPage