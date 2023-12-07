use std::{
    collections::HashMap,
};
use std::env;

use log::info;
use serde::Deserialize;

#[derive(Eq, Hash, PartialEq, Deserialize)]
pub enum  CvStaticEndpoints {
    JOB,
    COMPANY,
    TECH,
    USER,
    FIELDS,
    JOBTYPES,
    PROJECTS
}

#[derive(Eq, Hash, PartialEq, Deserialize)]
pub enum  CvActionsEndpoints {
    BOOKMARKS,
    FILTERS,
    ANNOTATIONS,
    USER
}



pub fn get_static_api_config () -> HashMap<CvStaticEndpoints, &'static str>  {

    let mut conf: HashMap<CvStaticEndpoints, &'static str> = HashMap::new();

    let dev = env::var("INTERACTIVEME_DEV").is_ok();

    
    conf.insert(CvStaticEndpoints::JOB, "http://localhost:8080/api/jobs");
    conf.insert(CvStaticEndpoints::COMPANY, "http://localhost:8080/api/companies");
    conf.insert(CvStaticEndpoints::TECH, "http://localhost:8080/api/techs");
    conf.insert(CvStaticEndpoints::FIELDS, "http://localhost:8080/api/fields");
    conf.insert(CvStaticEndpoints::JOBTYPES, "http://localhost:8080/api/jobtypes");
    conf.insert(CvStaticEndpoints::PROJECTS, "http://localhost:8080/api/projects");

    // if dev {
    //     conf.insert(CvStaticEndpoints::JOB, "http://localhost:8080/api/jobs");
    //     conf.insert(CvStaticEndpoints::COMPANY, "http://localhost:8080/api/companies");
    //     conf.insert(CvStaticEndpoints::TECH, "http://localhost:8080/api/techs");
    //     conf.insert(CvStaticEndpoints::FIELDS, "http://localhost:8080/api/fields");
    //     conf.insert(CvStaticEndpoints::JOBTYPES, "http://localhost:8080/api/jobtypes");
    //     conf.insert(CvStaticEndpoints::PROJECTS, "http://localhost:8080/api/projects");
    // } else {
    //     conf.insert(CvStaticEndpoints::JOB, "https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/jobs");
    //     conf.insert(CvStaticEndpoints::COMPANY, "https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/companies");
    //     conf.insert(CvStaticEndpoints::TECH, "https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/tech");
    //     conf.insert(CvStaticEndpoints::FIELDS, "https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/fields");
    //     conf.insert(CvStaticEndpoints::JOBTYPES, "https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/jobtypes");
    //     conf.insert(CvStaticEndpoints::PROJECTS, "https://xbhydccz1j.execute-api.eu-west-2.amazonaws.com/Prod/projects");
    // }
    
    conf
}

pub fn get_actions_api_config () -> HashMap<CvActionsEndpoints, &'static str>  {

    let mut conf: HashMap<CvActionsEndpoints, &'static str> = HashMap::new();

    let dev = env::var("INTERACTIVEME_DEV").is_ok();

    conf.insert(CvActionsEndpoints::BOOKMARKS, "http://localhost:8000/api/bookmarks");
        conf.insert(CvActionsEndpoints::FILTERS, "http://localhost:8000/api/filters");
        conf.insert(CvActionsEndpoints::ANNOTATIONS, "http://localhost:8000/api/annotations");
        conf.insert(CvActionsEndpoints::USER, "http://localhost:8000/api/users");
        
    // if dev {
    //     conf.insert(CvActionsEndpoints::BOOKMARKS, "http://localhost:8000/api/bookmarks");
    //     conf.insert(CvActionsEndpoints::FILTERS, "http://localhost:8000/api/filters");
    //     conf.insert(CvActionsEndpoints::ANNOTATIONS, "http://localhost:8000/api/annotations");
    //     conf.insert(CvActionsEndpoints::USER, "http://localhost:8000/api/users");
    // } else {
    //     conf.insert(CvActionsEndpoints::BOOKMARKS, "https://interactiveme.net/api/bookmarks");
    //     conf.insert(CvActionsEndpoints::FILTERS, "https://interactiveme.net/api/filters");
    //     conf.insert(CvActionsEndpoints::ANNOTATIONS, "https://interactiveme.net/api/annotations");
    //     conf.insert(CvActionsEndpoints::USER, "https://interactiveme.net/api/users");
    // }

    conf
}
