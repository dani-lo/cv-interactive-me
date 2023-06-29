use log::info;

use crate::{
    models::ModelTypes,
    traits::{
        can_annotate::Annotation, 
        can_bookmark::Bookmark, 
        can_filter::Filter
    }, appdata::stores::store_app_types::PendingStatus
};

pub fn resource_annotation(
    resource_type: ModelTypes,
    resource_id: &usize, 
    annotation_models: &Vec<Annotation>) -> Option<Annotation> {

    let note = &annotation_models
        .iter()
        .find(|&n| 
            n.resource_type == resource_type && 
            n.resource_id == *resource_id &&
            n.pending != PendingStatus::Fresh
        );
    
    if note.is_some() {
        Some(note.unwrap().clone())
    } else {
        None
    }
}

pub fn resource_bookmark(
    resource_type: &ModelTypes,
    resource_id: &usize,  
    bookmark_models: &Vec<Bookmark> ) -> Option<Bookmark> {

        let book = &bookmark_models
        .iter()
        .find(|&x| 
            x.resource_type == *resource_type && 
            x.resource_id == *resource_id);

    if book.is_some() {
        Some(book.unwrap().clone())
    } else {
        None
    }
}

pub fn resource_filters(
    resource_type: &ModelTypes,
    resource_id: &usize,  
    filter_models: &Vec<Filter> ) -> Option<Filter> {

        let filter = &filter_models
            .iter()
            .find(|&x| 
                x.resource_type == *resource_type && 
                x.resource_id == *resource_id);

    if filter.is_some() {
        Some(filter.unwrap().clone())
    } else {
        None
    }
}

// pub fn collectable_for_actionable 