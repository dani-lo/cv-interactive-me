use std::collections::HashMap;
use log::info;
use serde::{ Deserialize, Serialize };
use yew::html::ImplicitClone;

use crate::{
   models::Model, 
   traits::{
      can_bookmark::HasBookmarkTrait,
      can_annotate::HasAnnotationTrait, 
      can_filter::Filter,
   },
   util::{daterange::DateRange, filter_utils::{resource_is_included, some_resource_included_in_all_filters}}, appdata::stores::store_app_types::PendingStatus,
};

use super::{
   ModelTypes,
   tech_model::TechModel, 
   company_model::CompanyModel, 
   jobtype_model::JobtypeModel, StaticAsset,
};

 
 #[derive(Debug, Clone, Serialize, Deserialize)]
 pub struct  JobData {
    pub uid: usize,
    pub description: Vec<String>,
    pub title: String,
    pub company: Option<usize>,
    pub from: (u32, i32),
    pub to: (u32, i32),
    pub tech: Vec<usize>,
    pub tech_str: String,
    pub position: String,
    pub jobType: Vec<usize>,
 }

 impl StaticAsset for JobData {
   fn get_uid (&self) -> usize {
       self.uid.clone()
   }
}

 #[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
  pub struct  JobModel {
    pub uid: usize,
    pub description: Vec<String>,
    pub title: String,
    pub tech: Vec<TechModel>,
    pub company: Option<CompanyModel>,
    pub period: DateRange,
    pub position: String,
    pub job_type: Vec<JobtypeModel>,
}

impl ImplicitClone for JobModel {}

impl StaticAsset for JobModel {
   fn get_uid (&self) -> usize {
       self.uid.clone()
   }
}



impl Model for JobModel {

   fn get_resource_type (&self) -> ModelTypes {
       ModelTypes::Job
   }

   fn get_resource_id (&self) -> usize {
      self.uid
   }

   fn included_in_filters (&self, state_filters: &Vec<Filter>) -> bool {

      let mut filters_to_use = state_filters.clone();

      filters_to_use.retain(|f| f.pending != PendingStatus::Deleted && f.pending != PendingStatus::VoidThenDeleted);

      if filters_to_use.len() == 0 {
         return false
     }

      let job_techs = &self.tech;
      let job_types = &self.job_type;
      
      let company = self.company.clone();

      let has_tech_filters = filters_to_use.iter().any(|f| f.resource_type == ModelTypes::Tech);
      let has_jobtype_filters = filters_to_use.iter().any(|f| f.resource_type == ModelTypes::Jobtype);

      let skip_company_display = company.is_some() && !company.unwrap().included_in_filters(&filters_to_use);
      
      if skip_company_display {
         return true
      }

      info!("-- has_tech_filters {} {}", self.uid, has_tech_filters);
      info!("(some_resource_included_in_all_filters() :: {}", some_resource_included_in_all_filters(&filters_to_use, &job_techs));

      if !has_jobtype_filters && !has_tech_filters {
         return false
      }

      if has_jobtype_filters && !some_resource_included_in_all_filters(&filters_to_use, &job_types) {
         return false
      }

      if has_tech_filters && !some_resource_included_in_all_filters(&filters_to_use, &job_techs) {
         return false
      }

      true

      // // we know we have filters and they are relevant - i.e either job tech or job type flters, or both ..
      // // => skip display unless the job has tech or jobtype or both included in those filters

      // let foo = resource_is_included(filters_to_use, self);

      // return filters_to_use.iter().fold(true, |acc, f| {

      //    if acc == true {

      //       let any_tech_filtered_included = f.resource_type == ModelTypes::Tech && job_techs.iter().any(|t| t.uid == f.resource_id);
      //       let any_jobtype_filtered_included = f.resource_type == ModelTypes::Jobtype && job_types.iter().any(|j| j.uid == f.resource_id);

      //       if (has_tech_filters && any_tech_filtered_included) || (has_jobtype_filters && any_jobtype_filtered_included) {
      //          return false
      //       }

      //    }

      //    return acc
      // });
   }
}

impl HasAnnotationTrait for JobModel{}
impl HasBookmarkTrait for JobModel{}

impl JobModel {
    
   pub fn make (
      job_data: JobData, 
      companies_hashmap: &HashMap<usize, CompanyModel>,
      techs_hashmap: &HashMap<usize, TechModel>, 
      jobtypes_hashmap: &HashMap<usize, JobtypeModel>,
   ) -> Self {

      let mut job_techs : Vec<TechModel> = vec![];
         
      for tech_id in job_data.tech {
         job_techs.push(techs_hashmap.get(&tech_id).unwrap().clone());
      }

      let mut job_types : Vec<JobtypeModel> = vec![];

      for jobtype_id in job_data.jobType {
         job_types.push(jobtypes_hashmap.get(&jobtype_id).unwrap().clone());
      }
      
      if job_data.company.is_some() {

         let company = companies_hashmap.get(&job_data.company.unwrap());

         JobModel {
               uid: job_data.uid,
               description: job_data.description,  
               title: job_data.title,
               company: Some(company.unwrap().clone()),
               tech:job_techs,
               period: DateRange::new(job_data.from, job_data.to),
               position: job_data.position,
               job_type: job_types,
         }
      } else {
         JobModel {
               uid: job_data.uid,
               description: job_data.description,  
               title: job_data.title,
               company:None,
               tech:job_techs,
               period: DateRange::new(job_data.from, job_data.to),
               position: job_data.position,
               job_type: job_types,
         }
      }
   }
}