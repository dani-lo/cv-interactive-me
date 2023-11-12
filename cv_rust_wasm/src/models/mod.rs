use std::fmt;

use serde::{Deserialize, Serialize};

use crate::{traits::can_filter::Filter, appdata::stores::store_app_types::AppStaticDataHashes, util::daterange::DateRange};

pub mod job_model;
pub mod company_model;
pub mod tech_model;
pub mod jobtype_model;
pub mod field_model;
pub mod project_model;
pub mod user_model;

pub trait StaticAsset {
    fn get_uid (&self) -> usize;
    fn get_daterange (&self) -> Option<DateRange>;
}

pub trait Model {
    fn get_resource_type (&self) -> ModelTypes;
    fn get_resource_id (&self) -> usize;
    fn get_parent_resource (&self, model_hashes: AppStaticDataHashes) -> Option<(usize, ModelTypes)>;
    fn included_in_filters (&self, state_filters: &Vec<Filter>) -> bool;
}

#[derive(Eq, Hash, PartialEq, Clone, Copy, Deserialize, Serialize, PartialOrd, Ord)]
pub enum ModelTypes {
    Job,
    Company,
    Tech,
    Jobtype,
    Field,
    Project
}

impl ModelTypes {
    
    pub fn api_name (&self) -> &'static str {

        match self {
            &ModelTypes::Job => "Job",
            &ModelTypes::Company => "Company",
            &ModelTypes::Jobtype => "Jobtype",
            &ModelTypes::Field => "Field",
            &ModelTypes::Tech => "Tech",
            &ModelTypes::Project => "Project",
        } 
    }
}

impl fmt::Debug for ModelTypes {

    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {

        match *self {
            ModelTypes::Job => write!(f, "Model type JOB"),
            ModelTypes::Company => write!(f, "Model type COMPANY"),
            ModelTypes::Jobtype => write!(f, "Model type JOB_TYPE"),
            ModelTypes::Field => write!(f, "Model type FIELD"),
            ModelTypes::Tech => write!(f, "Model type TECH"),
            ModelTypes::Project => write!(f, "Model type PROJECT"),
        }
    }
}

impl fmt::Display for ModelTypes {

    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {

        match *self {
            ModelTypes::Job => write!(f, "job"),
            ModelTypes::Company => write!(f, "company"),
            ModelTypes::Jobtype => write!(f, "job type"),
            ModelTypes::Field => write!(f, "field"),
            ModelTypes::Tech => write!(f, "technology"),
            ModelTypes::Project => write!(f, "project"),
        }
    }
}