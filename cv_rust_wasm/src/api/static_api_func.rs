use std::collections::HashMap;
use gloo_net::http::Request;
use log::info;

use crate::{
    models::{
        job_model::{JobData, JobModel}, 
        tech_model::{ TechData, TechModel }, 
        field_model::{ FieldData, FieldModel }, 
        company_model::{ CompanyData, CompanyModel }, 
        jobtype_model::{ JobtypeData, JobtypeModel, JobtypePrefix }, 
        project_model::{ ProjectData, ProjectModel },
    }, 
    appdata::stores::store_app_types::AppStaticDataHashes,
    util::{
        make_model::make_job,
        hash_vec_utils::hash_model_vec_by_uid, 
        resource_for_resource::{
            company_fields,
            project_techs,
        }
    },
};

use super::config::{ 
    get_static_api_config, 
    CvStaticEndpoints 
};

pub async fn load_jobs () -> Vec<JobData> {

    let conf = get_static_api_config();
    let jobs_url = conf.get(&CvStaticEndpoints::JOB).unwrap();
   
    let jobs_request = Request::get(jobs_url)
        .send()
        .await;

    match jobs_request {
        Ok(res) => {
            res.json().await.unwrap()
        },
        Err(e) => {
            vec![]
        },
    }   
}

pub async fn load_companies () -> Vec<CompanyData> {

    let conf = get_static_api_config();
    let companies_url = conf.get(&CvStaticEndpoints::COMPANY).unwrap();

    let companies_request = Request::get(companies_url)
        .send()
        .await;
    
    match companies_request {
        Ok(res) => res.json().await.unwrap(),
        Err(e) => {
            vec![]
        },
    }   
}

pub async fn load_techs () -> Vec<TechData> {

    let conf = get_static_api_config();
    let techs_url = conf.get(&CvStaticEndpoints::TECH).unwrap();

    let techs_request = Request::get(techs_url)
        .send()
        .await; 
    
    match techs_request {
        Ok(res) => res.json().await.unwrap(),
        Err(e) => {
            vec![]
        },
    }   
}


pub async fn load_fields () -> Vec<FieldData> {

    let conf = get_static_api_config();
    let fields_url = conf.get(&CvStaticEndpoints::FIELDS).unwrap();

    let fields_request = Request::get(fields_url)
        .send()
        .await; 
    
    match fields_request {
        Ok(res) => res.json().await.unwrap(),
        Err(err) => {
            info!("{:?}", err);
            vec![]
        },
    }   
}

pub async fn load_job_types () -> Vec<JobtypeData> {

    let conf = get_static_api_config();
    let jobtypes_url = conf.get(&CvStaticEndpoints::JOBTYPES).unwrap();

    let jobtypes_request = Request::get(&jobtypes_url)
        .send()
        .await; 
    
    match jobtypes_request {
        Ok(res) => res.json().await.unwrap(),
        Err(err) => {
            info!("{:?}", err);
            vec![]
        },
    }   
}

pub async fn load_projects () -> Vec<ProjectData> {

    let conf = get_static_api_config();
    let projects_url = conf.get(&CvStaticEndpoints::PROJECTS).unwrap();
    
    let projects_request = Request::get(&projects_url)
        .send()
        .await; 
    
    match projects_request {
        Ok(res) => res.json().await.unwrap(),
        Err(err) => {
            info!("{:?}", err);
            vec![]
        },
    }   
}

pub async fn get_static_data_hash () -> AppStaticDataHashes {
    
    let fetched_jobs: Vec<JobData> = load_jobs().await;
    let fetched_tech: Vec<TechData> = load_techs().await;
    let fetched_companies : Vec<CompanyData> = load_companies().await;
    let fetched_jobtypes : Vec<JobtypeData> = load_job_types().await;
    let fetched_fields : Vec<FieldData> = load_fields().await;
    let fetched_projects : Vec<ProjectData> = load_projects().await;

    let tech_models: HashMap<usize, TechModel> = hash_model_vec_by_uid(
        fetched_tech,
        |tech_data_item: TechData| TechModel { 
            uid: tech_data_item.uid, 
            name: tech_data_item.name, 
        });

    let field_models: HashMap<usize, FieldModel> = hash_model_vec_by_uid(
        fetched_fields,
        |field_data_item: FieldData| FieldModel { 
            uid: field_data_item.uid, 
            name: field_data_item.name, 
        });

    let company_models: HashMap<usize, CompanyModel> = hash_model_vec_by_uid(
        fetched_companies,
        |company_data_item: CompanyData| CompanyModel { 
            field: company_fields(&company_data_item, &field_models),
            uid: company_data_item.uid, 
            name: company_data_item.name ,
            description: company_data_item.description
        });

    let jobtype_models: HashMap<usize, JobtypeModel> = hash_model_vec_by_uid(
        fetched_jobtypes,
        |jobtype_data_item: JobtypeData| JobtypeModel { 
            uid: jobtype_data_item.uid, 
            name: jobtype_data_item.name,
            prefix: if jobtype_data_item.prefix == "time" { JobtypePrefix::TIME } else { JobtypePrefix::PLACE },
        });

    let project_models : HashMap<usize, ProjectModel> = hash_model_vec_by_uid(
        fetched_projects,
        |project_data_item: ProjectData| ProjectModel { 
            tech: project_techs(&project_data_item, &tech_models),
            uid: project_data_item.uid, 
            name: project_data_item.name,
            description: project_data_item.description,
            status: project_data_item.status,
            live_url: project_data_item.live_url,
            repo: project_data_item.repo,
            notes: project_data_item.notes,
        });
    
    let job_models: HashMap<usize, JobModel> = hash_model_vec_by_uid(
        fetched_jobs,
        |job_data_item: JobData| make_job(
            job_data_item, 
            &company_models, 
            &tech_models, 
            &jobtype_models
        ));

    AppStaticDataHashes { 
        jobs: job_models,
        techs: tech_models,
        companies: company_models,
        jobtypes: jobtype_models,
        fields: field_models,
        projects: project_models,
    }
}