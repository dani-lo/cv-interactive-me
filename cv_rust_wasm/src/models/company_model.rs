use serde::{ 
    Deserialize, Serialize 
};

use crate::
{
    traits::{
        can_annotate::HasAnnotationTrait, 
        can_filter::Filter
    }, 
    appdata::stores::store_app_types::{PendingStatus, AppStaticDataHashes}, 
    util::filter_utils::some_resource_included_in_all_filters,
};

use super::{Model, ModelTypes, field_model::FieldModel, StaticAsset, job_model::JobModel};

#[derive(Debug, Serialize, Deserialize)]
pub struct CompanyData {
    pub uid: usize,
    pub name: String,
    pub description: String,
    pub field: Vec<usize>
}

impl StaticAsset for CompanyData {
    fn get_uid (&self) -> usize {
        self.uid.clone()
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, PartialOrd)]
pub struct CompanyModel {
    pub uid: usize,
    pub name: String,
    pub description: String,
    pub field: Vec<FieldModel>,
}

impl HasAnnotationTrait for CompanyModel {}

impl StaticAsset for CompanyModel {
    fn get_uid (&self) -> usize {
        self.uid.clone()
    }
}

impl Model for CompanyModel {
    
    fn get_resource_type (&self) -> ModelTypes {

        ModelTypes::Company
    }

    fn get_resource_id (&self) -> usize {
        
        self.uid
    }

    fn included_in_filters (&self, state_filters: &Vec<Filter>) -> bool {

        let mut filters_to_use = state_filters.clone();

        filters_to_use.retain(|f| f.pending != PendingStatus::Deleted && f.pending != PendingStatus::VoidThenDeleted);

        if filters_to_use.len() == 0 {
            return true
        }

        let company_fields = &self.field;

        let has_field_filters = state_filters.iter().any(|f| f.resource_type == ModelTypes::Field);

        if has_field_filters && !some_resource_included_in_all_filters(&filters_to_use, &company_fields) {
            return false 
        }

        return true

    }

    fn get_parent_resource (&self, model_hashes: AppStaticDataHashes) -> Option<(usize, ModelTypes)> {


        let job_list: Vec<&JobModel> = model_hashes.jobs.values().collect();

        let parent_job_opt = job_list.iter().find(|j| {
            
            let c = j.company.clone();

            c.is_some() && c.unwrap().uid == self.uid
        });

        if parent_job_opt.is_none() {
            return None
        }

        let parent_job = parent_job_opt.unwrap();

        Some((parent_job.uid, ModelTypes::Job))
    }
}