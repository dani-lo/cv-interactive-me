use std::{collections::HashMap, cmp::Ordering};

use serde::{ Deserialize, Serialize };

use crate::{
    traits::{
        can_annotate::HasAnnotationTrait, 
        can_bookmark::HasBookmarkTrait, 
        can_filter::Filter
    }, 
    appdata::stores::store_app_types::{
        PendingStatus, 
        AppStaticDataHashes
    }, 
    util::filter_utils::some_resource_included_in_all_filters, 
};

use super::{Model, ModelTypes, StaticAsset, tech_model::TechModel};

#[derive(Debug, Serialize, Deserialize)]
pub struct ProjectData {
    pub uid: usize,
    pub name: String,
    pub description: Vec<String>,
    pub status: Vec<String>,
    pub live_url: String,
    pub repo: String,
    pub notes: String,
    pub tech: Vec<usize>,
}

impl StaticAsset for ProjectData {
    fn get_uid (&self) -> usize {
        self.uid.clone()
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, PartialOrd)]
pub struct ProjectModel {
    pub uid: usize,
    pub name: String,
    pub description: Vec<String>,
    pub status: Vec<String>,
    pub live_url: String,
    pub repo: String,
    pub notes: String,
    pub tech: Vec<TechModel>,
} 

impl HasAnnotationTrait for ProjectModel {}
impl HasBookmarkTrait for ProjectModel {}

impl StaticAsset for ProjectModel {
    fn get_uid (&self) -> usize {
        self.uid.clone()
    }
}

impl Ord for ProjectModel {
 
    fn cmp(&self, other:&Self) -> Ordering {

        let fist_uidr = self.uid;
        let second_uid = other.uid;
        
        if fist_uidr > second_uid {
            return Ordering::Greater;
        }
        if fist_uidr < second_uid {
            return Ordering::Less;
        }
        
        Ordering::Equal
    }
    
 }

impl ProjectModel {
    pub fn make (
        project_data: &ProjectData, 
        techs_hashmap: &HashMap<usize, TechModel>, 
     ) -> Self {
  
        let mut project_techs : Vec<TechModel> = vec![];
           
        for tech_id in &project_data.tech {
            project_techs.push(techs_hashmap.get(&tech_id).unwrap().clone());
        }

        ProjectModel {
            uid: project_data.uid,
            description: project_data.description.clone(),  
            name: project_data.name.clone(),
            tech:project_techs,
            repo: project_data.repo.clone(),
            status: project_data.status.clone(),
            live_url: project_data.live_url.clone(),
            notes: project_data.notes.clone(),
        }
       
     }
}

impl Model for ProjectModel {

    fn get_resource_type (&self) -> ModelTypes {
        ModelTypes::Project
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

        let project_techs = &self.tech;
        
        let has_tech_filters = state_filters.iter().any(|f| f.resource_type == ModelTypes::Tech);

        if has_tech_filters && !some_resource_included_in_all_filters(&filters_to_use, &project_techs) {
            return false 
        }

        return true
    }

    fn get_parent_resource (&self, _: AppStaticDataHashes) -> Option<(usize, ModelTypes)> {
        None
    }
}