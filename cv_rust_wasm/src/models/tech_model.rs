use serde::{ Deserialize, Serialize };

use crate::{
    traits::can_filter::{
        HasFilterTrait, 
        Filter,
    }, 
    appdata::stores::store_app_types::AppStaticDataHashes, 
    util::daterange::DateRange,
};

use super::{Model, ModelTypes, StaticAsset};

#[derive(Debug, Serialize, Deserialize)]
pub struct TechData {
    pub uid: usize,
    pub name: String,
}

impl StaticAsset for TechData {
    fn get_uid (&self) -> usize {
        self.uid.clone()
    }
    fn get_daterange (&self) -> Option<DateRange> {
        None
    }
}
 
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, PartialOrd)]
pub struct TechModel {
    pub uid: usize,
    pub name: String,
}

impl StaticAsset for TechModel {
    fn get_uid (&self) -> usize {
        self.uid.clone()
    }
    fn get_daterange (&self) -> Option<DateRange> {
        None
    }
}

impl HasFilterTrait for TechModel {}

impl Model for TechModel {
    fn get_resource_type (&self) -> ModelTypes {
        ModelTypes::Tech
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