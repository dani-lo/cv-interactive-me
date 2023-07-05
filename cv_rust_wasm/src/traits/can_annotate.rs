use std::string::String;
use serde::{Deserialize, Serialize};
use fixedstr::fstr;

use crate::{
    models::{ ModelTypes, Model, StaticAsset }, 
    appdata::stores::store_app_types::{Collectable, Actionable, PendingStatus}
};

use super::ActionModeltarget;

#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
pub struct Annotation {
    pub _id: Option<String>, 
    pub resource_id: usize,
    pub resource_type: ModelTypes,
    pub pending: PendingStatus,
    pub text: String,
}

#[derive(Debug, Clone, PartialEq, Deserialize)]
pub struct AnnotationData {
    pub _id: Option<String>, 
    pub resource_id: usize,
    pub resource_type: ModelTypes,
    pub text: String,
}

impl Annotation {
    pub fn from_resource (a: &Actionable, txt: String) -> Self 
    {
        Self {
            _id: None,
            resource_id: a.resource_id.unwrap(),
            resource_type: a.resource_type.unwrap(),
            text: txt,
            pending: PendingStatus::Added,
        }
    }

    pub fn from_collectable (a: &Collectable) -> Self {
        
        let fixed_str_id: Option<fixedstr::fstr<24>> = Collectable::maybe_id(a._id);
        let txt = a.action_txt.unwrap().to_string();
        
        Self {
            _id: if fixed_str_id.is_some() { Some(fixed_str_id.unwrap().to_string()) } else { None },
            resource_id: a.resource_id.unwrap(),
            resource_type: a.resource_type.unwrap(),
            text:  txt.to_owned(),
            pending: a.pending.unwrap(),
        }
    }
}

impl ActionModeltarget for Annotation {
    fn get_resource_type_type(&self) -> ModelTypes {
        self.resource_type
    }
    fn get_resource_type_uid(&self) -> usize {
        self.resource_id
    }
}

pub trait CanAnnotate {
    fn do_annotate (&self,  text: String) -> Annotation;
}

pub trait HasAnnotationTrait{}

impl <T> CanAnnotate for T where T : HasAnnotationTrait + Model + StaticAsset {

    fn do_annotate(&self, text: String ) -> Annotation {

       Annotation {
            _id: None,
            resource_id: self.get_uid(),
            resource_type: self.get_resource_type(), 
            pending: PendingStatus::Unknown,
            text
       }
    }
}