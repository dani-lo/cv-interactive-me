use crate::models::ModelTypes;

pub fn get_mod_type (m:  &'static str) -> ModelTypes {

    if m == "jobType" {
        ModelTypes::Jobtype
    } else if m == "tech" {
        ModelTypes::Tech
    } else if m == "job" {
        ModelTypes::Job
    } else if m == "field" {
        ModelTypes::Field
    } else if m == "company" {
        ModelTypes::Company
    } else if m == "project" {
        ModelTypes::Project
    } else {
        ModelTypes::Job
    }
}