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
            let jobs_hashmap = &static_models.jobs;
            // let jobs = jobs_hashmap.values().collect<();
            // let job =jobs.iter().find(|j| j)

            let mut job_id = 0;

            for  (_k, j) in jobs_hashmap.iter() {

                let comp = j.company.clone();
                
                if comp.is_some() && comp.unwrap().uid == res_id {
                    job_id = j.uid;
                }
                // println!("key={}, value={}", k, v);
            }

            if job_id > 0 {
                return Some((job_id, ModelTypes::Job));
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