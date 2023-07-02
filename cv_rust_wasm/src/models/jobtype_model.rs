use std::cmp::Ordering;

use serde::{ Deserialize, Serialize };

use crate::{traits::can_filter::{HasFilterTrait, Filter}, appdata::stores::store_app_types::AppStaticDataHashes};

use super::{Model, ModelTypes, StaticAsset};

#[derive(Debug, Serialize, Deserialize)]
pub struct JobtypeData {
    pub uid: usize,
    pub name: String,
    pub prefix: String,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, PartialOrd)]
pub enum JobtypePrefix {
    TIME,
    PLACE
}

impl StaticAsset for JobtypeData {
    fn get_uid (&self) -> usize {
        self.uid.clone()
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, PartialOrd)]
pub struct JobtypeModel {
    pub uid: usize,
    pub name: String,
    pub prefix: JobtypePrefix,
}

impl HasFilterTrait for JobtypeModel {}
 
impl StaticAsset for JobtypeModel {
    fn get_uid (&self) -> usize {
        self.uid.clone()
    }
}

impl Model for JobtypeModel {
    fn get_resource_type (&self) -> ModelTypes {
        ModelTypes::Jobtype
    }

    fn get_resource_id (&self) -> usize {
        self.uid
    }

    fn included_in_filters (&self, _: &Vec<Filter>) -> bool {
        true
    }

    fn get_parent_resource (&self, _: AppStaticDataHashes) -> Option<(usize, ModelTypes)> {
        None
    }
}