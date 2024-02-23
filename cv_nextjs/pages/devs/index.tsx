import { FormEvent } from 'react';
 

import React from 'react'

import { getAppStaticProps } from '../../lib/api/getAppStaticProps'

import { Job } from '../../src/models/classes/Job'

import { mapToComponents } from '../../src/helpers/mapMap'
import { transformData } from '../../src/helpers/transformData'

import { 
  AppDataProps,
} from '../../src/types'

export const getStaticProps = getAppStaticProps

const DevsPage = (props: AppDataProps) => {

  // const { jobModels, techModels } = transformData(props)

  //   const techs = Array.from(techModels.values()).sort((a, b) => {
  //       if (a.name.toUpperCase() > b.name.toUpperCase()) {
  //           return 1
  //       } else if (b.name.toUpperCase() > a.name.toUpperCase()) {
  //           return -1
  //       }
  //       return 0
  //   })

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
 
    const formData = new FormData(event.currentTarget);
    const response = await fetch('/devs/api/submit', {
      method: 'GET',
    });
    
    console.log(response)
    // Handle response if necessary
    // const data = await response.json()

    // console.log('RECEIVED', data)
    // ...
  }
 
  return <div className="page" style={{ marginTop: '3rem' }}>  
      <form onSubmit={onSubmit}>
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </form>
    </div>
  
}

export default DevsPage



// import { 
//     AppDataProps,
// } from '../../src/types'
// import { RichTextParagraphComponent } from '../../components/widget/richTextParagraph'

// export const getStaticProps = getAppStaticProps

// const JobsPage = (props: AppDataProps) => {
 
//     const { jobModels, techModels } = transformData(props)

//     const techs = Array.from(techModels.values()).sort((a, b) => {
//         if (a.name.toUpperCase() > b.name.toUpperCase()) {
//             return 1
//         } else if (b.name.toUpperCase() > a.name.toUpperCase()) {
//             return -1
//         }
//         return 0
//     })

//     return <div className="page">  
        
//         </div> 
        
       
// }

// export default JobsPage