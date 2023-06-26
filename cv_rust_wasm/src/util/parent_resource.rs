use crate::{
    models::ModelTypes, 
    appdata::stores::store_app_types::AppStaticDataHashes
};

pub fn parent_resource_or_self (
        static_models: &AppStaticDataHashes,
        res_id: usize, 
        res_type: ModelTypes) -> Option<(usize, ModelTypes)> {
    
    match res_type {
        ModelTypes::Company => {
            let resource_hashmap = &static_models.jobs;
            let resource = resource_hashmap.get(&res_id);

            if resource.is_some() {
                return Some((resource.unwrap().uid, ModelTypes::Job));
            } else {
                return None;
            }
        }
        ModelTypes::Job => {
            return Some((res_id, ModelTypes::Job));
        }
        ModelTypes::Project => {
            return Some((res_id, ModelTypes::Project));
        }
        ModelTypes::Tech => {
            return None;
        }
        ModelTypes::Field => {
            return None;
        }
        ModelTypes::Jobtype => {
            return None;
        }
    }
}