pub mod can_annotate;
pub mod can_bookmark;
pub mod can_filter;
pub mod load_remote;

use std::fmt;

use serde::Deserialize;

use crate::{
    models::ModelTypes,
};

pub fn annotateable (m: ModelTypes) -> bool {
    m == ModelTypes::Job || m == ModelTypes::Project
}

pub fn bookmarkable (m: ModelTypes) -> bool {
    m == ModelTypes::Job || m == ModelTypes::Company || m == ModelTypes::Project
}

pub fn filterable (m: ModelTypes) -> bool {
    m == ModelTypes::Tech || m == ModelTypes::Field || m == ModelTypes::Jobtype
}

pub trait ActionModeltarget {
    fn get_resource_type_type (&self) -> ModelTypes;
    fn get_resource_type_uid (&self) -> usize;
}

#[derive(Eq, Hash, PartialEq, Clone, Copy, Deserialize)]
pub enum ActionTypes {
    ANNOTATION,
    BOOKMARK,
    FILTER
}

impl fmt::Debug for ActionTypes {

    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {

        match *self {
            ActionTypes::ANNOTATION => write!(f, "Action type ANNOTATION"),
            ActionTypes::BOOKMARK => write!(f, "Action type BOOKMARK"),
            ActionTypes::FILTER => write!(f, "Action type FILTER"),
        }
    }
}