#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

mod models;
mod routes;

use std::{
    fs,
    path::Path,
};
use rocket_contrib::json::Json;
use rocket_cors::{AllowedOrigins, CorsOptions};
use rocket::http::Method;
use serde_json::from_str;

use crate::{
    models::{
        CompanyData,
        TechData,
        JobData,
        JobtypeData,
        FieldData,
        ProjectData,
    },
    // routes::{
    //     companies,
    //     techs,
    //     jobs,
    //     jobtypes,
    //     fields,
    //     projects,
    // }
};

#[get("/companies")]
fn companies() -> Json<Vec<CompanyData>> {
    
    let path = Path::new("./json/companies.json");
    let contents = fs::read_to_string(path).unwrap();

    let res : Vec<CompanyData> = from_str(&contents.as_str()).unwrap();
    
    Json(res)
}

#[get("/techs")]
fn techs() -> Json<Vec<TechData>> {
    
    let path = Path::new("./json/tech.json");
    let contents = fs::read_to_string(path).unwrap();

    let res : Vec<TechData> = from_str(&contents.as_str()).unwrap();
    
    Json(res)
}

#[get("/jobtypes")]
fn jobtypes() -> Json<Vec<JobtypeData>> {
    
    let path = Path::new("./json/jobtypes.json");
    let contents = fs::read_to_string(path).unwrap();

    let res : Vec<JobtypeData> = from_str(&contents.as_str()).unwrap();
    
    Json(res)
}

#[get("/jobs")]
fn jobs() -> Json<Vec<JobData>> {
    
    let path = Path::new("./json/jobs.json");
    let contents = fs::read_to_string(path).unwrap();

    let res : Vec<JobData> = from_str(&contents.as_str()).unwrap();
    
    Json(res)
}

#[get("/fields")]
fn fields() -> Json<Vec<FieldData>> {
    
    let path = Path::new("./json/fields.json");
    let contents = fs::read_to_string(path).unwrap();

    let res : Vec<FieldData> = from_str(&contents.as_str()).unwrap();
    
    Json(res)
}

#[get("/projects")]
fn projects() -> Json<Vec<ProjectData>> {
    
    let path = Path::new("./json/projects.json");
    let contents = fs::read_to_string(path).unwrap();

    let res : Vec<ProjectData> = from_str(&contents.as_str()).unwrap();
    
    Json(res)
}


// #[get("/foolers")]
// pub fn foolers() -> Json<Vec<JobData>> {
    
//     let path = Path::new("./json/jobs.json");
//     let path_tech = Path::new("./json/tech.json");
//     let path_compnies = Path::new("./json/companies.json");
//     let contents = fs::read_to_string(path).unwrap();
//     let contents_tech = fs::read_to_string(path_tech).unwrap();
//     let contents_comps = fs::read_to_string(path_compnies).unwrap();

//     let res : Vec<JobData> = from_str(&contents.as_str()).unwrap();
//     let res_tech: Vec<TechData> = from_str(&contents_tech.as_str()).unwrap();
//     let res_comps: Vec<CompanyData> = from_str(&&contents_comps.as_str()).unwrap();

//     // let res_out = Vec::new();

//     // res_out.app

//     println!("HELOOOOOOOOO");

//     for job in &res {
//         // println!("===================== {} =======================", job.company.);

//         let comp = res_comps.iter().find(|c| {
//             if job.company.is_some() {
//                 return c.uid == job.company.unwrap();
//             }
//             return false
//         });

//         if comp.is_some() {
//             println!("__________________ {}", comp.unwrap().name)
//         } else {
//             println!("__________________  no companysssss")
//         }

//         for tech in &job.tech {

//             let tech_def = res_tech.iter().find(|rt| {
//                 return rt.uid == *tech
//             });

//             if tech_def.is_some() {
//                 println!("{}", tech_def.unwrap().name)
//             }
//         }
//     }

    
//     Json(res)
// }


fn main() {

    let cors = CorsOptions::default()
    .allowed_origins(AllowedOrigins::all())
    .allowed_methods(
        vec![Method::Get, Method::Post, Method::Patch]
            .into_iter()
            .map(From::from)
            .collect(),
    )
    .allow_credentials(true);

    rocket::ignite().attach(cors.to_cors().unwrap()).mount("/api", routes![
        companies,
        techs,
        jobs,
        jobtypes,
        fields,
        projects,
        // foolers
        ]).launch();
}