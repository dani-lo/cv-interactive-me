import { getAppStaticProps } from "../../lib/api/getAppStaticProps"
import { transformData } from "../../src/helpers/transformData"
import { AppDataProps } from "../../src/types"

import { 
    techsWithMonthsDuration,
    techWeight
} from '../../src/helpers/weightTechs'

import { StyledAboutContainer } from '../../styles/main.styled'

export const getStaticProps = getAppStaticProps

const PersonalPage = (props: AppDataProps) => {

    const { jobModels, projectModels, techModels } = transformData(props)

    const jobs = Array.from(jobModels.values())
    const projects = Array.from(projectModels.values())

    const allTechhavers = [ ...jobs, ...projects ]

    const techWeights = techsWithMonthsDuration(allTechhavers)
    const techIDs = Array.from(techWeights.keys())
    const techValues = Array.from(techWeights.values())
    const maxWeight = techValues.reduce((acc, curr) => curr > acc ? curr : acc, 0)

    return <div className="page">  
        <div className="jobs-container">
            <StyledAboutContainer>
                <ul className="itemised">
                    <li><strong>Daniele Longo</strong></li>
                    <li><strong>danielelongo@hotmail.com</strong></li>
                    <li><a href="https://github.com/dani-lo"><strong>github</strong></a></li>
                    <li><a href="https://interactiveme.net"><strong>interactiveme.net</strong></a></li>
                </ul>
            </StyledAboutContainer>
            <StyledAboutContainer>
                <h3>Professional Qualities</h3>
                <p>I am an experienced developer, with a positive can do attitude. A good communicator amongst both technical and non-technical stakeholders, I enjoy finding simple, and thus elegant, solutions to complex problems.</p>
            </StyledAboutContainer>
            <StyledAboutContainer>
                <h3>Skills</h3>
                {
                    techIDs.map((techID, i) => {
                        const fontSize = techWeight(techID, techWeights, maxWeight)
                        const model = techModels.get(techID)

                        if (model === undefined) {
                            return null
                        }

                        const style = {
                            fontSize: `${ fontSize }px`,
                            marginRight: `var(--gap-small)`,
                            display: 'inline-block'
                        }

                        return <span key={ i } style={ style }>{ model.name }</span>
                    })
                }
            </StyledAboutContainer>
            <StyledAboutContainer>
                <h3>Experience and team fit</h3>
                <p>A naturally respectful and approachable person, my extensive experience in working within different sized teams, management styles and work arrangements has given me a solid understanding of work processes and collaborative best practices across all aspects of the professional environment</p>
            </StyledAboutContainer>
            <StyledAboutContainer>
                <h3>Education</h3>
                <ul>
                    <li className="itemised">Laurea in <strong>Scienze della Comunicazione </strong>at Universita degli studi di Siena - Bachelor's Degree (BSc) equivalent in <strong>Media Studies</strong> at Siena University, Italy, First class honours (1st) - 2004</li></ul>
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