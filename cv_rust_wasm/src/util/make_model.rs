use std::collections::HashMap;

use crate::models::{
   job_model::{
      JobData, JobModel
   }, 
   company_model::CompanyModel, 
   tech_model::TechModel, 
   jobtype_model::JobtypeModel, project_model::{ProjectData, ProjectModel}
};

pub fn make_jobs(
      d: Vec<JobData>, 
      c: &HashMap<usize, CompanyModel>, 
      t: &HashMap<usize, TechModel>,
      j: &HashMap<usize, JobtypeModel>) -> Vec<JobModel> {
 
   d.iter().map(|j_data| JobModel::make(
      j_data.clone(), 
      &c, 
      &t, 
      &j
   )).collect()
}

pub fn make_job(
      j_data: JobData, 
      c: &HashMap<usize, CompanyModel>, 
      t: &HashMap<usize, TechModel>,
      j: &HashMap<usize, JobtypeModel>) -> JobModel {
 
   JobModel::make(
      j_data.clone(), 
      &c, 
      &t, 
      &j
   )
}

pub fn make_projects(
      d: Vec<ProjectData>, 
      t: &HashMap<usize, TechModel>) -> Vec<ProjectModel> {

   d.iter().map(|p_data| ProjectModel::make(
      p_data.clone(), 
      &t, 
   )).collect()
}