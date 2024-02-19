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
import { RichTextParagraphComponent } from '../../components/widget/richTextParagraph'

export const getStaticProps = getAppStaticProps

const JobsPage = (props: AppDataProps) => {
        console.log(props)    
    const { jobModels, projectModels, techModels } = transformData(props)

    const jobs = Array.from(jobModels.values())
    const projects = Array.from(projectModels.values())

    const allTechhavers = [ ...jobs, ...projects ]

    const techs = Array.from(techModels.values()).sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1
        } else if (b.name.toUpperCase() > a.name.toUpperCase()) {
            return -1
        }
        return 0
    })

    const listStyle = {
        display: 'list-item',
        listStyle: 'circle',
        listStylePosition: 'inside'
    }

    
    console.log(techs)

    return <div className="print">  
        <div className="pers-data">
            <h2 className="dani">
                <strong>Daniele Longo</strong>
                <br />
                <strong style={{ fontSize: '13px'}}>daniele.longo.development@gmail.com</strong>
            </h2>
            <h2 className="detail-list">
                <strong>github.com/dani-lo</strong>
                <strong>nextjs.interactiveme.net</strong>
            </h2>
        </div>
            
            <h2 style={{ marginTop: '2rem' }}>Professional Qualities and Team Fit</h2>
            <p>I am an experienced developer, with a positive can do attitude; a naturally respectful and approachable person, I enjoy finding simple solutions to complex problems.</p>
            <p>My extensive experience in working within different sized teams, management styles and work arrangements has given me a solid understanding of work processes and collaborative best practices across all aspects of the professional environment</p>
            
            {/* <h2>Projects</h2>
            <ul>
                <li>Web Assembly</li>
                <li>Shape recognition (chart)</li>
                <li>CLI</li>
                <li>NextJS</li>
            </ul> */}
                <h2>Education</h2>
                <ul>
                    <li className="itemised">
                        Laurea in <strong>Scienze della Comunicazione </strong>at Universita degli studi di Siena - Bachelors Degree (BSc) equivalent in <strong>Media Studies</strong> at Siena University, Italy, First class honours (1st).
                    </li>
                    <li className="itemised">
                        Certified - <strong>AWS</strong> Cloud Practitioner
                    </li>
                </ul>
            <h2>Professional Experience</h2>
            {            
                mapToComponents<Job>(jobModels, (job: Job, i: number)  => {

                    const jobtypesTime = job.jobType.filter(jt => jt.prefix == "TIME")
                    const jobtypesPlace = job.jobType.filter(jt => jt.prefix == "PLACE") 
                    const fields = job.company?.field || []
                    return  <>
                        <h3 className="job-itle" style={ { display: 'flex', textTransform: 'capitalize'  } }> 
                            <span className="job-pos">
                                { job.period.formatted }: { job.position }
                            </span>
                            
                            <span> 
                                { job.company  ? <span>{  job.company.name  }</span> : null }
                                {/* { fields?.length ? <span>Field: </span> : null } */}
                                {
                                    fields.map(f => <span style={{ paddingLeft: '0.5rem', display: 'inline-block'}} key={ f.name }>({ f.name })</span>)
                                }
                            </span>
                        </h3>

                        <h3 className="job-subtitle" style={ { display: 'flex', justifyContent: 'space-between', textTransform: 'capitalize' } }>
                        <span> 
                            Type:
                            {
                                jobtypesTime.map((jobTypeItem, i) => {
                                    return <span className="resource-name" key={ jobTypeItem.uid }> { jobTypeItem.name }{ `${ i < jobtypesTime.length - 1 ? ', ' : '' }` }</span>
                                })
                            }
                        </span>
                        {/* <span> - </span> */}
                        <span> 
                            From: 
                            {
                                jobtypesPlace.map((jobTypeItem, i) => {
                                    return <span className="resource-name" key={ jobTypeItem.uid }> { jobTypeItem.name }{ `${ i < jobtypesPlace.length - 1  ? ' + ' : '' }` }</span>
                                })
                            } 
                        </span>
                        </h3>
                        <ul>
                            {
                                job.description.map((task: string, i: number) => {
                                    return <li key={ task.replace(/\s/g, '') }>
                                        <RichTextParagraphComponent text={ task } />
                                        {
                                            i < job.description.length - 1 ? <span>;</span> : <span>.</span>
                                        }
                                    </li>
                                })
                            }
                        </ul>
                        <ul className="some-tech">
                            <li><span>Some tech involved</span>:</li>
                            {
                             (job.tech).map((t, i) => {

                                if (i > 4) {
                                    return null
                                }
                                return <li key={ t.uid}>{t.name}</li>
                             })
                            }
                        </ul>
                    </>
                })
            }

            <h2>Technical Skills and Exposure</h2>
            <h3>Primary</h3>
            <ul className="skills">
            {
                techs.filter(t => t.primary).map(tech => {
                    return <li key={ tech.name }>{ tech.name }</li>
                })
            }
            </ul>
            <h3>Other</h3>
            <ul className="skills">
            {/* <p><b>NOTE</b> most of the following skills hasve been honed in a professional environment, some on a personal projects basis</p> */}
            {
                techs.filter(t => !t.primary).map(tech => {
                    return <li key={ tech.name }>{ tech.name }</li>
                })
            }
            </ul>
            <h2>Personal Interests</h2>
                <ul>
                    <li className="itemised list-item">Yoga, Meditation</li>
                    <li className="itemised list-item">Traveling</li>
                    <li className="itemised list-item">Books</li>
                    <li className="itemised list-item">Cooking</li>
                    <li className="itemised list-item">Indian Philosophy</li>
                </ul>
        </div> 
        
       
}

export default JobsPage