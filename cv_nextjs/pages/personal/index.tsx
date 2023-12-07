import { getAppStaticProps } from "../../lib/api/getAppStaticProps"
import { transformData } from "../../src/helpers/transformData"
import { AppDataProps } from "../../src/types"

import { 
    techsWithMonthsDuration,
    techWeight
} from '../../src/helpers/weightTechs'

import { StyledAboutContainer } from '../../styles/main.styled'
import { namedListSort } from "../../src/helpers/sort"

export const getStaticProps = getAppStaticProps

const PersonalPage = (props: AppDataProps) => {

    console.log(props)
    
    const { jobModels, projectModels, techModels } = transformData(props)

    const jobs = Array.from(jobModels.values())
    const projects = Array.from(projectModels.values())

    const allTechhavers = [ ...jobs, ...projects ]

    const techMonthsDurationsList = techsWithMonthsDuration(allTechhavers)

    const techIDs = Array.from(techMonthsDurationsList.keys())
    const techValues = Array.from(techMonthsDurationsList.values())
    
    const maxWeight = techValues.reduce((acc, curr) => curr > acc ? (curr * 0.75) : acc, 0)

    const weightedTechList = techIDs.map((techID, i) => {

        const fontSize = techWeight(techID, techMonthsDurationsList, maxWeight)
        const model = techModels.get(techID)

        if (model === undefined) {
            return null
        }

        const style = {
            fontSize: `${ fontSize }px`,
            marginRight: `var(--gap-small)`,
            display: 'inline-block'
        }

        return {
            style,
            name: model.name
        }
    })

    console.log(weightedTechList.filter(d => d !== null).sort(namedListSort))

    return <div className="page">  
        <div className="jobs-container">
            <StyledAboutContainer>
                <ul className="itemised">
                    <li><strong>Daniele Longo</strong></li>
                    <li><strong>danielelongo@hotmail.com</strong></li>
                    <li><a href="https://github.com/dani-lo"><strong>github</strong></a></li>
                    {/* <li><a href="https://interactiveme.net"><strong>interactiveme.net</strong></a></li> */}
                </ul>
            </StyledAboutContainer>
            <StyledAboutContainer>
                <h3>Professional Qualities</h3>
                <p>I am an experienced developer, with a positive can do attitude. A good communicator with both technical and non-technical colleagues, I enjoy finding simple solutions to complex problems.</p>
            </StyledAboutContainer>
            <StyledAboutContainer>
                <h3>Experience and team fit</h3>
                <p>A naturally respectful and approachable person, my extensive experience in working within different sized teams, management styles and work arrangements has given me a solid understanding of work processes and collaborative best practices across all aspects of the professional environment.</p>
            </StyledAboutContainer>
            <StyledAboutContainer>
                <h3>Education</h3>
                <ul>
                    <li className="itemised">Laurea in <strong>Scienze della Comunicazione </strong>at Universita degli studi di Siena - Bachelors Degree (BSc) equivalent in <strong>Media Studies</strong> at Siena University, Italy, First class honours (1st).</li></ul>
            </StyledAboutContainer>
            <StyledAboutContainer>
                <h3>Skills</h3>
                {
                    weightedTechList.filter(d => d !== null).sort(namedListSort).map((def, i) => {
                       if (def === null) {
                        return null
                       }
                        return <span key={ i } style={ def.style }>{ def.name }</span>
                    })
                }
            </StyledAboutContainer>
            <StyledAboutContainer>
                <h3>Personal Interests</h3>
                <ul>
                    <li className="itemised list-item">Yoga, Meditation</li>
                    <li className="itemised list-item">Traveling</li>
                    <li className="itemised list-item">Books</li>
                    <li className="itemised list-item">Cooking</li>
                    <li className="itemised list-item">Indian Philosophy</li>
                </ul>
            </StyledAboutContainer>
        </div>
    </div>
}

export default PersonalPage