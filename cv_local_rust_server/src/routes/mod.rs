use std::{
    fs,
    path::Path,
};
use rocket_contrib::json::Json;
use serde_json::from_str;

use crate::models::{
    CompanyData,
    TechData,
    JobData,
    JobtypeData,
    FieldData,
    ProjectData,
};

#[get("/companies")]
pub fn companies() -> Json<Vec<CompanyData>> {
    
    let path = Path::new("./json/companies.json");
    let contents = fs::read_to_string(path).unwrap();

    let res : Vec<CompanyData> = from_str(&contents.as_str()).unwrap();
    
    Json(res)
}

#[get("/techs")]
pub fn techs() -> Json<Vec<TechData>> {
    
    let path = Path::new("./json/tech.json");
    let contents = fs::read_to_string(path).unwrap();

    let res : Vec<TechData> = from_str(&contents.as_str()).unwrap();
    
    Json(res)
}

#[get("/jobtypes")]
pub fn jobtypes() -> Json<Vec<JobtypeData>> {
    
    let path = Path::new("./json/jobtypes.json");
    let contents = fs::read_to_string(path).unwrap();

    let res : Vec<JobtypeData> = from_str(&contents.as_str()).unwrap();
    
    Json(res)
}

#[get("/jobs")]
pub fn jobs() -> Json<Vec<JobData>> {
    
    let path = Path::new("./json/jobs.json");
    let contents = fs::read_to_string(path).unwrap();

    let res : Vec<JobData> = from_str(&contents.as_str()).unwrap();
    
    Json(res)
}

#[get("/fields")]
pub fn fields() -> Json<Vec<FieldData>> {
    
    let path = Path::new("./json/fields.json");
    let contents = fs::read_to_string(path).unwrap();

    let res : Vec<FieldData> = from_str(&contents.as_str()).unwrap();
    
    Json(res)
}

#[get("/projects")]
pub fn projects() -> Json<Vec<ProjectData>> {
    
    let path = Path::new("./json/projects.json");
    let contents = fs::read_to_string(path).unwrap();

    let res : Vec<ProjectData> = from_str(&contents.as_str()).unwrap();
    
    Json(res)
}