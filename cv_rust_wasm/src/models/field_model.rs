use serde::{ Deserialize, Serialize };

use crate::{traits::can_filter::{HasFilterTrait, Filter}, appdata::stores::store_app_types::AppStaticDataHashes};

use super::{Model, ModelTypes, StaticAsset};

use crate::util::daterange::DateRange;

#[derive(Debug, Serialize, Deserialize)]
pub struct FieldData {
    pub uid: usize,
    pub name: String,
}

impl StaticAsset for FieldData {
    fn get_uid (&self) -> usize {
        self.uid.clone()
    }
    fn get_daterange (&self) -> Option<DateRange> {
        None
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, PartialOrd)]
pub struct FieldModel {
    pub uid: usize,
    pub name: String,
}

impl HasFilterTrait for FieldModel {}

impl StaticAsset for FieldModel {
    fn get_uid (&self) -> usize {
        self.uid.clone()
    }
    fn get_daterange (&self) -> Option<DateRange> {
        None
    }
}

impl Model for FieldModel {
    fn get_resource_type (&self) -> ModelTypes {
        ModelTypes::Field
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