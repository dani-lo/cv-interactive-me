import React from 'react'

import { getAppStaticProps } from '../../lib/api/getAppStaticProps'

import { Job } from '../../src/models/classes/Job'

import { mapToComponents } from '../../src/helpers/mapMap'
import { transformData } from '../../src/helpers/transformData'


import { 
    AppDataProps,
} from '../../src/types'
import { RichTextParagraphComponent } from '../../components/widget/richTextParagraph'
import { JobType } from '../../src/models/classes/JobType'
import { Field } from '../../src/models/classes/Field'

export const getStaticProps = getAppStaticProps

const JobsPage = (props: AppDataProps) => {
 
    const { jobModels, techModels } = transformData(props)

    const techs = Array.from(techModels.values()).sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1
        } else if (b.name.toUpperCase() > a.name.toUpperCase()) {
            return -1
        }
        return 0
    })

    return <div className="print">  
        <div className="pers-data">
            <h2 className="dani">
                <strong>Daniele Longo</strong>
                <br />
                <strong style={{ fontSize: '13px'}}>dani@interactiveme.net</strong>
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
                        <JobTitlePrint job={ job } jobtypesPlace={ jobtypesPlace} jobtypesTime={ jobtypesTime } fields={ fields } />
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

const JobTitlePrint = ({ job, jobtypesTime, jobtypesPlace, fields }: { job: Job, jobtypesTime: JobType[], jobtypesPlace: JobType[], fields: Field[] }) => {
    return <div className='job-title-container'>
        <h3>{ job.period.formatted }: { job.position }</h3>
        <div className="job-details-info">
            <span className="job-pos-how"> 
                { job.company  ? <span>@ {  job.company.name  }</span> : <span>@ Various Clients</span> }
                { fields?.length ? <span> - </span> : null }
                {
                    fields.map((f, i) => <span  key={ f.name }>{ f.name }{ i < fields.length - 1 ? ', ' : '' }</span>)
                }
            </span>
            <span className="job-pos-what"> 
                {
                    jobtypesTime.map((jobTypeItem, i) => {
                        return <span className="resource-name" key={ jobTypeItem.uid }> { jobTypeItem.name }{ `${ i < jobtypesTime.length - 1 ? ', ' : '' }` }</span>
                    })
                };
            </span>
            <span  className="job-pos-how"> 
                {
                    jobtypesPlace.map((jobTypeItem, i) => {
                        return <span className="resource-name" key={ jobTypeItem.uid }> { jobTypeItem.name }{ `${ i < jobtypesPlace.length - 1  ? ' + ' : '' }` }</span>
                    })
                } 
            </span>
        </div>
    </div>
}

export default JobsPage

