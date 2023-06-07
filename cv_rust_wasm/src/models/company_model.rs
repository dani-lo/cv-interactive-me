use serde::{ Deserialize, Serialize };

use crate::{traits::
    {
        can_annotate::HasAnnotationTrait, 
        can_filter::Filter
    }, 
    appdata::stores::store_app_types::PendingStatus, util::filter_utils::some_resource_included_in_all_filters
};

use super::{Model, ModelTypes, field_model::FieldModel, StaticAsset};

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

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
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

        // // we know we have filters and they are relevant - i.e company field flters
        // // => skip display unless the company has a field included in those filters

        // let is_any_field_filter_included = state_filters.iter().fold(true, |acc, filter| {
                        
        //    if acc == true &&  filter.resource_type == ModelTypes::Field &&  company_fields.iter().any(|t| t.uid == filter.resource_id) {
        //          return false
        //    }
  
        //    return acc
        // });

        // is_any_field_filter_included
     }
}