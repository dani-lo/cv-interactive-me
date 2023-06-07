use std::fmt;
use fixedstr::fstr;
use serde::{Serialize, Deserialize};

use std::collections::HashMap;

use crate::models::ModelTypes;

use crate::models::company_model::CompanyModel;
use crate::models::field_model::FieldModel;
use crate::models::job_model::JobModel;
use crate::models::jobtype_model::JobtypeModel;
use crate::models::project_model::ProjectModel;
use crate::models::tech_model::TechModel;

use crate::traits::{
    ActionModeltarget, ActionTypes
};

#[derive(Eq, Hash, PartialEq, Clone, Copy, Debug, Serialize, Deserialize)]
pub enum PendingStatus {
    Added,
    Deleted,
    Void,
    VoidThenDeleted,
    VoidThenEdited,
    Unknown,
    Fresh,
}

impl Default for PendingStatus {
    fn default() -> Self {
        PendingStatus::Added
    }
}

impl fmt::Display for PendingStatus {

    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {

        match *self {
            PendingStatus::Added => write!(f, "PendingStatus Added"),
            PendingStatus::Deleted => write!(f, "PendingStatus Deleted"),
            PendingStatus::Void => write!(f, "PendingStatus Void"),
            PendingStatus::VoidThenDeleted => write!(f, "PendingStatus VoidThenDeleted"),
            PendingStatus::VoidThenEdited => write!(f, "PendingStatus VoidThenEdited"),
            PendingStatus::Fresh => write!(f, "PendingStatus Fresh"),
            PendingStatus::Unknown => write!(f, "PendingStatus Unknown"),
        }
    }
}

#[derive(Debug, PartialEq, Eq, Clone, Copy, Serialize, Deserialize)]
pub struct Actionable {
    pub resource_type: Option<ModelTypes>,
    pub resource_id: Option<usize>,
}

impl Default for Actionable {
    fn default() -> Self {
        Self {
            resource_id: None,
            resource_type: None,
        }
    }
}

impl Actionable {
    pub fn update(&mut self, res_type: ModelTypes, res_id: usize) {
        self.resource_type = Some(res_type);
        self.resource_id = Some(res_id);
    }

    pub fn reset (&mut self) {
        self.resource_type = None;
        self.resource_id = None;
    }
}

impl ActionModeltarget for Collectable {
    fn get_resource_type_type(&self) -> ModelTypes {
        self.resource_type.unwrap()
    }
    fn get_resource_type_uid(&self) -> usize {
        self.resource_id.unwrap()
    }
}

#[derive(Debug, PartialEq, Clone, Copy)]
pub struct Collectable {
    pub _id: Option<fstr<24>>,
    pub resource_type: Option<ModelTypes>,
    pub resource_id: Option<usize>,
    pub pending: Option<PendingStatus>,
    pub action_type: Option<ActionTypes>,
}

impl Default for Collectable {
    fn default() -> Self {
        Self {
            _id: None,
            resource_id: None,
            resource_type: None,
            pending: None,
            action_type: None,
        }
    }
}

impl Collectable {

    pub fn maybe_id (obj_id: Option<fstr<24>>) -> Option<fstr<24>> {
        if obj_id.is_some() { obj_id } else { None }
    }

    pub fn maybe_string_id (obj_id: Option<String>) -> Option<fstr<24>> {
        if obj_id.is_some() { 

            let obj_id_string = obj_id.unwrap();
            let obj_id_slice: &str = &obj_id_string[..];

            Some(fstr::make(obj_id_slice))
         } else { 
            None 
        }
    }

    pub fn update(&mut self, res_type: ModelTypes, res_id: usize) {
        self.resource_type = Some(res_type);
        self.resource_id = Some(res_id);
    }

    pub fn reset (&mut self) {
        self.resource_type = None;
        self.resource_id = None;
    }

    pub fn from_resource<T> () {}
}

#[derive(Debug, PartialEq, Eq, Clone, Deserialize, Serialize)]
pub struct AppStaticDataHashes {
    pub jobs: HashMap<usize, JobModel>,
    pub techs: HashMap<usize, TechModel>,
    pub companies: HashMap<usize, CompanyModel>,
    pub jobtypes: HashMap<usize, JobtypeModel>,
    pub fields: HashMap<usize, FieldModel>,
    pub projects: HashMap<usize, ProjectModel>,
}

impl Default for AppStaticDataHashes {
    fn default() -> Self {
        Self {
            jobs: HashMap::new(),
            techs: HashMap::new(),
            companies: HashMap::new(),
            fields: HashMap::new(),
            jobtypes: HashMap::new(),
            projects: HashMap::new()
        }
    }
}

#[derive(Debug, Eq, PartialEq, Clone, Serialize, Deserialize)]
pub struct  StaticModels {
    pub model_hashes: AppStaticDataHashes
}

impl Default for StaticModels {
    fn default() -> Self {
        Self {
            model_hashes: AppStaticDataHashes::default(),
        }
    }
}

impl StaticModels {

    pub fn default () -> Self {
        Self {
            model_hashes: AppStaticDataHashes::default(),
        }
    }

    pub fn set_models (&mut self, model_hashes: AppStaticDataHashes) {
        self.model_hashes = model_hashes;
    }
}