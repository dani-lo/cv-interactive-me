use std::collections::HashMap;

use crate::{
    models::{
        field_model::FieldModel, 
        company_model::CompanyData, 
        project_model::ProjectData, 
        tech_model::TechModel,
    }, 
};

pub fn company_fields(
        company_data_item: &CompanyData, 
        field_models: &HashMap<usize, FieldModel>) -> Vec<FieldModel> {

    let mut company_fields : Vec<FieldModel> = vec![];

    for field_id in &company_data_item.field {
        company_fields.push(field_models.get(&field_id).unwrap().clone());
    }

    company_fields
}

pub fn project_techs(
        project_data_item: &ProjectData, 
        tech_models: &HashMap<usize, TechModel>) -> Vec<TechModel > {

    let mut project_tech : Vec<TechModel> = vec![];

    for tech_id in &project_data_item.tech {
        project_tech.push(tech_models.get(&tech_id).unwrap().clone());
    }

    project_tech
}