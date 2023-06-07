use serde::{Deserialize, Serialize};

use crate::{
    models::{ ModelTypes, Model, StaticAsset }, 
    appdata::stores::store_app_types::{Actionable, Collectable, PendingStatus}
};

use super::ActionModeltarget;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct FilterData {
    pub _id: Option<String>, 
    pub resource_id: usize,
    pub resource_type: ModelTypes,
}

#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
pub struct Filter {
    pub _id: Option<String>, 
    pub resource_id: usize,
    pub resource_type: ModelTypes,
    pub pending: PendingStatus,
}

impl Filter {

    pub fn from_resource (a: &Actionable) -> Self 
    {
        Self {
            _id: None,
            resource_id: a.resource_id.unwrap(),
            resource_type: a.resource_type.unwrap(),
            pending: PendingStatus::Added,
        }
    }

    pub fn from_collectable (a: &Collectable) -> Self {
        
        let fixed_str_id: Option<fixedstr::fstr<24>> = Collectable::maybe_id(a._id);

        Self {
            _id: if fixed_str_id.is_some() { Some(fixed_str_id.unwrap().to_string()) } else { None },
            resource_id: a.resource_id.unwrap(),
            resource_type: a.resource_type.unwrap(),
            pending: a.pending.unwrap(),
        }
    }
}

impl ActionModeltarget for Filter {
    fn get_resource_type_type(&self) -> ModelTypes {
        return self.resource_type
    }
    fn get_resource_type_uid(&self) -> usize {
        return self.resource_id;
    }
}

pub trait CanFilter {
    fn do_filter (&self) -> Filter;
    // fn is_filtered (&self) -> bool;
}

pub trait HasFilterTrait{}

impl <T>CanFilter for T where T: HasFilterTrait + Model + StaticAsset {

    fn do_filter(&self) -> Filter {

       Filter {
            _id: None,
            resource_id: self.get_uid(),
            resource_type: self.get_resource_type(), 
            pending: PendingStatus::Unknown,
       }
    }
}