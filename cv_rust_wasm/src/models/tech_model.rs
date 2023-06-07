use serde::{ Deserialize, Serialize };

use crate::{
    traits::can_filter::{
        HasFilterTrait, 
        Filter,
    },
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
}
 
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct TechModel {
    pub uid: usize,
    pub name: String,
}

impl StaticAsset for TechModel {
    fn get_uid (&self) -> usize {
        self.uid.clone()
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

    // fn get_parent_resource<JobModel> (&self, _model_hashes: AppStaticDataHashes) -> Option<JobModel>{
    //     let jobs_hashes = _model_hashes.jobs;
    //     let job = jobs_hashes.get(&self.uid);
        
    //     Some::<JobModel>(job.unwrap().to_owned())
    // }
}