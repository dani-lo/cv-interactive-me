use serde::{ Deserialize, Serialize };

use crate::traits::can_filter::{HasFilterTrait, Filter};

use super::{Model, ModelTypes, StaticAsset};

#[derive(Debug, Serialize, Deserialize)]
pub struct FieldData {
    pub uid: usize,
    pub name: String,
}

impl StaticAsset for FieldData {
    fn get_uid (&self) -> usize {
        self.uid.clone()
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct FieldModel {
    pub uid: usize,
    pub name: String,
}

impl HasFilterTrait for FieldModel {}

impl StaticAsset for FieldModel {
    fn get_uid (&self) -> usize {
        self.uid.clone()
    }
}

impl Model for FieldModel {
    fn get_resource_type (&self) -> ModelTypes {
        ModelTypes::Field
    }

    fn get_resource_id (&self) -> usize {
        self.uid
    }

    fn included_in_filters (&self, state_filters: &Vec<Filter>) -> bool {
        true
    }
}