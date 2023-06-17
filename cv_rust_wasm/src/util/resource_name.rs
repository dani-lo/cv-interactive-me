use crate::{
    models::ModelTypes, 
    appdata::stores::store_app_types::AppStaticDataHashes
};

pub struct ResourceName {
    pub name: String,
    pub type_name: &'static str,
}

pub fn resource_name (
        static_models: &AppStaticDataHashes, 
        res_type: ModelTypes, 
        res_id: usize) -> ResourceName {

    match res_type {
        ModelTypes::Job => {
            let resource_hashmap = &static_models.jobs;
            let resource = resource_hashmap.get(&res_id);

            if resource.is_some() {
                ResourceName{
                    type_name: "job", 
                    name: resource.unwrap().period.formatted()
                }
            } else {
                ResourceName{
                    type_name: "job", 
                    name: "not found".to_string()
                }
            }
        }
        ModelTypes::Jobtype => {
            let resource_hashmap = &static_models.jobtypes;
            let resource = resource_hashmap.get(&res_id);

            if resource.is_some() {
                ResourceName{
                    type_name: "job type", 
                    name: resource.unwrap().name.clone()
                }
            } else {
                ResourceName{
                    type_name: "job type", 
                    name: "not found".to_string()
                }
            }
        }
        ModelTypes::Tech => {
            let resource_hashmap = &static_models.techs;
            let resource = resource_hashmap.get(&res_id);

            if resource.is_some() {
                ResourceName{
                    type_name: "technology", 
                    name: resource.unwrap().name.clone()
                }
            } else {
                ResourceName{
                    type_name: "technology", 
                    name: "not found".to_string()
                }
            }
        }
        ModelTypes::Field => {
            let resource_hashmap = &static_models.fields;
            let resource = resource_hashmap.get(&res_id);

            if resource.is_some() {
                ResourceName{
                    type_name: "company field", 
                    name: resource.unwrap().name.clone()
                }
            } else {
                ResourceName{
                    type_name: "company field", 
                    name: "not found".to_string()
                }
            }
        }
        ModelTypes::Company => {
            let resource_hashmap = &static_models.companies;
            let resource = resource_hashmap.get(&res_id);

            if resource.is_some() {
                ResourceName{
                    type_name: "company", 
                    name: resource.unwrap().name.clone()
                }
            } else {
                ResourceName{
                    type_name: "company", 
                    name: "not found".to_string()
                }
            }
        }
        ModelTypes::Project => {
            let resource_hashmap = &static_models.projects;
            let resource = resource_hashmap.get(&res_id);

            if resource.is_some() {
                ResourceName{
                    type_name: "project", 
                    name: resource.unwrap().name.clone()
                }
            } else {
                ResourceName{
                    type_name: "project", 
                    name: "not found".to_string()
                }
            }
        }
    }
}