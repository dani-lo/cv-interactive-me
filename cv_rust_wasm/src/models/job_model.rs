use std::{collections::HashMap, cmp::Ordering};
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
   util::{daterange::DateRange, filter_utils::{resource_is_included, some_resource_included_in_all_filters}}, appdata::stores::store_app_types::{PendingStatus, AppStaticDataHashes},
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
   fn get_daterange (&self) -> Option<DateRange> {
      Some(DateRange::new(self.from, self.to))
   }
}

 #[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, PartialOrd)]
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
   fn get_daterange (&self) -> Option<DateRange> {
      Some(self.period.clone())
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
   }

   fn get_parent_resource (&self, _: AppStaticDataHashes) -> Option<(usize, ModelTypes)> {
      None
  }
}

impl HasAnnotationTrait for JobModel{}
impl HasBookmarkTrait for JobModel{}

impl Ord for JobModel {
   
   fn cmp(&self, other:&Self) -> Ordering {

      let fist_uidr = self.uid;
      let second_uid = other.uid;
   
      if fist_uidr > second_uid {
         return Ordering::Greater;
      }
      if fist_uidr < second_uid {
         return Ordering::Less;
      }
      
      Ordering::Equal
   }
}


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

   pub fn included_in_page (&self, page_jobs: &Vec<JobModel>) -> bool {
      
      let ids: Vec<_> = page_jobs.iter().map(|d|  {
         d.get_resource_id()
      })
      .collect();

      ids.contains(&self.get_resource_id())
   }
}