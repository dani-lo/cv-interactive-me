use std::collections::HashMap;
use gloo_net::http::Request;
use serde::Deserialize;
use log::info;


use crate::{ 
    appdata::stores::{store_app_types::{
        Collectable, 
        PendingStatus,
    }, store_app::StoreApp},
    traits::{
        can_filter::{
            Filter, 
            FilterData
        },
        can_bookmark::{
            Bookmark, 
            BookmarkData
        },
        can_annotate::{
            Annotation, 
            AnnotationData
        }, 
        ActionTypes, 
    },
    models::user_model::{
        UserModel, 
        get_user
    },
};

use super::{
    config::{ 
        get_actions_api_config, 
        CvActionsEndpoints
    }
};

#[derive(Debug, Clone, PartialEq, Deserialize)]
pub struct ActionItemResponse<T> {
    pub data : HashMap<String, T>
}

#[derive(Debug, Clone, PartialEq, Deserialize)]
pub struct ActionItemResponseNest<T> {
    data: ActionItemResponse<T>
}


/*
    FILTERS
*/

pub async fn get_user_filters () -> Option<ActionItemResponse<Vec<FilterData>>> {

    let user : Option<UserModel> = get_user().await;

    if user.is_none() {
        return None;
    }

    let conf = get_actions_api_config();
    let filters_url = conf.get(&CvActionsEndpoints::FILTERS).unwrap();
    
    let filters_query_url = format!("{}/{}", filters_url, user.unwrap()._id.unwrap());

    let jobs_request = Request::get(&filters_query_url)
        .send()
        .await;

    match jobs_request {
        Ok(res) => {

            let r = res.json().await.unwrap();
            Some(r)
        },
        Err(e) => {
            info!("{}", e);
            None
        },
    }   
}

pub async fn create_filter (filter: Filter) -> Option<ActionItemResponse<FilterData>> {

    let user : Option<UserModel> = get_user().await;

    if user.is_none() {
        return None;
    }

    let conf = get_actions_api_config();
    let filters_url = conf.get(&CvActionsEndpoints::FILTERS).unwrap();
    
    let body_str = format!(
        "{{ \"resource_type\": \"{}\", \"resource_id\": {}, \"userId\":  \"{}\" }}", 
        filter.resource_type.api_name(), 
        filter.resource_id,
        user.unwrap()._id.unwrap()
    );

    let body =  wasm_bindgen::JsValue::from_str(&body_str);

    let jobs_request = Request::post(filters_url)
        .header("Content-Type", "text/plain")
        .body(body)
        .send()
        .await;

    match jobs_request {
        Ok(res) => {
                
            let r = res.json().await.unwrap();
            Some(r)
        },
        Err(e) => {
            info!("{}", e);
            None
        },
    }   
}

pub async fn delete_filter (filter: Filter) -> Option<ActionItemResponse<bool>> {

    let conf = get_actions_api_config();
    let filters_url = conf.get(&CvActionsEndpoints::FILTERS).unwrap();

    let filter_id = filter._id;

    if filter_id.is_some() {

        let filters_query_url = format!("{}/{}", filters_url, filter_id.unwrap());

        let jobs_request = Request::delete(&filters_query_url)
            .send()
            .await;

        match jobs_request {
            Ok(res) => {
                
                let mut res = HashMap::new();

                res.insert(String::from("deleted"), true);
                
                Some(ActionItemResponse {
                    data: res
                })
            },
            Err(e) => {
                info!("{}", e);
                None
            },
        }   
        
    } else {
        None
    }   
}

/*
    BOOKMARKS
*/

pub async fn get_user_bookmarks () -> Option<ActionItemResponse<Vec<BookmarkData>>> {
    
    let user : Option<UserModel> = get_user().await;

    if user.is_none() {
        return None;
    }


    let conf = get_actions_api_config();
    let bookmarks_url = conf.get(&CvActionsEndpoints::BOOKMARKS).unwrap();
    
    let bookmarks_query_url = format!("{}/{}", bookmarks_url, user.unwrap()._id.unwrap());

    let jobs_request = Request::get(&bookmarks_query_url)
        .send()
        .await;

    match jobs_request {
        Ok(res) => {
                
            let r = res.json().await.unwrap();
            Some(r)
        },
        Err(e) => {
            info!("{}", e);
            None
        },
    }   
}

pub async fn create_bookmark (bookmark: Bookmark) -> Option<ActionItemResponse<BookmarkData>> {

    let user : Option<UserModel> = get_user().await;

    if user.is_none() {
        return None;
    }

    let conf = get_actions_api_config();
    let bookmarks_url = conf.get(&CvActionsEndpoints::BOOKMARKS).unwrap();
    
    let body_str = format!(
         "{{ \"resource_type\": \"{}\", \"resource_id\": {}, \"userId\":  \"{}\" }}", 
         bookmark.resource_type.api_name(), 
         bookmark.resource_id,
         user.unwrap()._id.unwrap()
    );

    let body =  wasm_bindgen::JsValue::from_str(&body_str);

    let jobs_request = Request::post(bookmarks_url)
        .body(body)
        .send()
        .await;

    match jobs_request {
        Ok(res) => {
                
            let r = res.json().await.unwrap();
            Some(r)
        },
        Err(e) => {
            info!("{}", e);
            None
        },
    }   
}

pub async fn delete_bookmark (bookmark: Bookmark) -> Option<ActionItemResponse<bool>> {

    let conf = get_actions_api_config();
    let bookmarks_url = conf.get(&CvActionsEndpoints::BOOKMARKS).unwrap();
    let bookmark_id = bookmark._id;

    if bookmark_id.is_some() {

        let bookmarks_query_url = format!("{}/{}", bookmarks_url, bookmark_id.unwrap());

        let jobs_request = Request::delete(&bookmarks_query_url)
            .send()
            .await;

        match jobs_request {
            Ok(res) => {
                
                let mut res = HashMap::new();

                res.insert(String::from("deleted"), true);
                
                Some(ActionItemResponse {
                    data: res
                })
            },
            Err(e) => {
                info!("{}", e);
                None
            },
        }   
        
    } else {
        None
    }   
}

/*
    ANNOTATIONS
*/

pub async fn get_user_annotations () -> Option<ActionItemResponse<Vec<AnnotationData>>> {
    
    let user : Option<UserModel> = get_user().await;

    if user.is_none() {
        return None;
    }

    
    let conf = get_actions_api_config();
    let annotations_url = conf.get(&CvActionsEndpoints::ANNOTATIONS).unwrap();
    
    let annotations_query_url = format!("{}/{}", annotations_url, user.unwrap()._id.unwrap());

    let jobs_request = Request::get(&annotations_query_url)
        .send()
        .await;

    match jobs_request {
        Ok(res) => {
                
            let r = res.json().await.unwrap();
            Some(r)
        },
        Err(e) => {
            info!("{}", e);
            None
        },
    }   
}

pub async fn create_annotation (annotation: Annotation) -> Option<ActionItemResponse<AnnotationData>> {

    let user : Option<UserModel> = get_user().await;

    if user.is_none() {
        return None;
    }


    let conf = get_actions_api_config();
    let annotations_url = conf.get(&CvActionsEndpoints::ANNOTATIONS).unwrap();
    
    let body_str = format!(
        "{{ \"resource_type\": \"{}\", \"resource_id\": {}, \"text\": {}, \"userId\":  \"{}\" }}", 
         annotation.resource_type.api_name(), 
         annotation.resource_id,
         annotation.text,
         user.unwrap()._id.unwrap()
    );

    let body =  wasm_bindgen::JsValue::from_str(&body_str);

    let jobs_request = Request::post(annotations_url)
        .body(body)
        .send()
        .await;

    match jobs_request {
        Ok(res) => {
                
            let r = res.json().await.unwrap();
            Some(r)
        },
        Err(e) => {
            info!("{}", e);
            None
        },
    }   
}

pub async fn edit_annotation (annotation: Annotation) -> Option<ActionItemResponse<AnnotationData>> {

    let user : Option<UserModel> = get_user().await;

    if user.is_none() {
        return None;
    }

    let conf = get_actions_api_config();
    let annotations_url = conf.get(&CvActionsEndpoints::ANNOTATIONS).unwrap();
    let annotation_id = annotation._id;

    if annotation_id.is_some() {
        
        let annotations_query_url = format!("{}/{}", annotations_url, annotation_id.unwrap());

        let body_str = format!(
             "{{ \"resource_type\": \"{}\", \"resource_id\": {}, \"text\": {}, \"userId\":  \"{}\" }}", 
             annotation.resource_type.api_name(), 
             annotation.resource_id,
             annotation.text,
             user.unwrap()._id.unwrap()
        );
    
        let body =  wasm_bindgen::JsValue::from_str(&body_str);
    
        let jobs_request = Request::patch(&annotations_query_url)
            .body(body)
            .send()
            .await;
    
        match jobs_request {
            Ok(res) => {

                let r = res.json().await.unwrap();
                Some(r)
            },
            Err(e) => {
                info!("{}", e);
                None
            },
        }   
    } else {
        None
    }
}

pub async fn delete_annotation (annotation: Annotation) -> Option<ActionItemResponse<bool>> {

    let conf = get_actions_api_config();
    let annotations_url = conf.get(&CvActionsEndpoints::ANNOTATIONS).unwrap();
    let annotation_id = annotation._id;

    if annotation_id.is_some() {

        let annotations_query_url = format!("{}/{}", annotations_url, annotation_id.unwrap());

        let jobs_request = Request::delete(&annotations_query_url)
            .send()
            .await;

        match jobs_request {
            Ok(res) => {

                let mut res = HashMap::new();

                res.insert(String::from("deleted"), true);
                
                Some(ActionItemResponse {
                    data: res
                })
            },
            Err(e) => {
                info!("{}", e);
                None
            },
        }   
    } else {
        None
    }   
}

pub async fn persist_appstate_pending (
    pending_annotations_collectables : Vec<Collectable>,
    pending_bookmarks_collectables : Vec<Collectable>,
    pending_filters_collectables : Vec<Collectable>,
    state: StoreApp,

) -> HashMap<ActionTypes, Vec<Collectable>> { 

    let mut vec_responses_deleted = Vec::new();
    let mut hashed_response_resorces : HashMap<ActionTypes, Vec<Collectable>> = HashMap::new();

    let mut vec_responses_collectable_bookmarks = Vec::new();
    let mut vec_responses_collectable_filters = Vec::new();
    let mut vec_responses_collectable_annotations = Vec::new();

    info!("IN PERSIST :: pending_filters_collectables {:?}", pending_filters_collectables);

    for pending_filter_collectable in pending_filters_collectables {

        let f = Filter::from_collectable(&pending_filter_collectable);

        if pending_filter_collectable.pending.unwrap() == PendingStatus::Added {
            let res = create_filter(f).await;
            let f_data_res = res.unwrap().data;
            let f_data = f_data_res.get("filter").unwrap();

            let c = Collectable {
                _id: Collectable::maybe_string_id(f_data._id.clone()),
                resource_id: Some(f_data.resource_id),
                resource_type: Some(f_data.resource_type),
                pending: Some(PendingStatus::Void),
                action_type: Some(ActionTypes::FILTER),
            };

            vec_responses_collectable_filters.push(c);
        } else if pending_filter_collectable.pending.unwrap() == PendingStatus::VoidThenDeleted {

            info!("IN PERSIST :: delete this filter :: {:?}", f._id);

            vec_responses_deleted.push(delete_filter(f).await);
            
        }
    };

    for pending_bookmark_collectable in pending_bookmarks_collectables {

        let b = Bookmark::from_collectable(&pending_bookmark_collectable);

        if pending_bookmark_collectable.pending.unwrap() == PendingStatus::Added {
            let res = create_bookmark(b).await;
            let b_data_res = res.unwrap().data;
            let b_data = b_data_res.get("bookmark").unwrap();

            let c = Collectable {
                _id: Collectable::maybe_string_id(b_data._id.clone()),
                resource_id: Some(b_data.resource_id),
                resource_type: Some(b_data.resource_type),
                pending: Some(PendingStatus::Void),
                action_type: Some(ActionTypes::BOOKMARK),
            };

            vec_responses_collectable_bookmarks.push(c);
        } else if pending_bookmark_collectable.pending.unwrap() == PendingStatus::VoidThenDeleted {
            vec_responses_deleted.push(delete_bookmark(b).await);
        }
    };

    for pending_annotation_collectable in pending_annotations_collectables {

        let mut a = Annotation::from_collectable(&pending_annotation_collectable, "");
        let existing = state.annotations
            .iter()
            .find(|n| {
                n.resource_id == pending_annotation_collectable.resource_id.unwrap() && 
                n.resource_type == pending_annotation_collectable.resource_type.unwrap()
            });

        if existing.is_some() {
            a.text = existing.unwrap().text.clone();
        }

        if pending_annotation_collectable.pending.unwrap() == PendingStatus::Added {

            let res = create_annotation(a).await;
            let a_data_res = res.unwrap().data;
            let a_data = a_data_res.get("annotation").unwrap();

            let c = Collectable {
                _id: Collectable::maybe_string_id(a_data._id.clone()),
                resource_id: Some(a_data.resource_id),
                resource_type: Some(a_data.resource_type),
                pending: Some(PendingStatus::Void),
                action_type: Some(ActionTypes::ANNOTATION),
            };

            vec_responses_collectable_annotations.push(c);
        } else if pending_annotation_collectable.pending.unwrap() == PendingStatus::VoidThenDeleted {
            vec_responses_deleted.push(delete_annotation(a).await);
        }
    };

    hashed_response_resorces.insert(ActionTypes::FILTER, vec_responses_collectable_filters);
    hashed_response_resorces.insert(ActionTypes::BOOKMARK, vec_responses_collectable_bookmarks);
    hashed_response_resorces.insert(ActionTypes::ANNOTATION, vec_responses_collectable_annotations);

    hashed_response_resorces
}

pub async fn get_user_actions () -> HashMap<ActionTypes, Vec<Collectable>> { 
    let filters_data = get_user_filters().await;
    let bookmarks_data = get_user_bookmarks().await;
    let annotations_data = get_user_annotations().await;
    
    // info!("{:?}", filters_data);annotation

    let mut collectable_filters : Vec<Collectable> = Vec::new();

    if filters_data.is_some() {
        let filters_d = filters_data.unwrap();
        let filters_key = "filters".to_string();

        let filters = filters_d.data.get(&filters_key);

        collectable_filters = filters.unwrap().iter().map(|d| {
            Collectable {
                _id:  Collectable::maybe_string_id(d._id.clone()),
                resource_type: Some(d.resource_type),
                resource_id: Some(d.resource_id),
                pending: Some(PendingStatus::Void),
                action_type: Some(ActionTypes::FILTER),
            }
        }).collect();
    }

    let mut collectable_bookmarks : Vec<Collectable> = Vec::new();

    if bookmarks_data.is_some() {
        let bookmarks_d = bookmarks_data.unwrap();
        let bookmarks_key = "bookmarks".to_string();

        let bookmarks = bookmarks_d.data.get(&bookmarks_key);

        collectable_bookmarks = bookmarks.unwrap().iter().map(|d| {
            Collectable {
                _id:  Collectable::maybe_string_id(d._id.clone()),
                resource_type: Some(d.resource_type),
                resource_id: Some(d.resource_id),
                pending: Some(PendingStatus::Void),
                action_type: Some(ActionTypes::FILTER),
            }
        }).collect();
    }

    let mut collectable_annotations : Vec<Collectable> = Vec::new();

    if annotations_data.is_some() {
        let annotations_d = annotations_data.unwrap();
        let annotations_key = "annotations".to_string();

        let annotations = annotations_d.data.get(&annotations_key);

        collectable_annotations = annotations.unwrap().iter().map(|d| {
            Collectable {
                _id:  Collectable::maybe_string_id(d._id.clone()),
                resource_type: Some(d.resource_type),
                resource_id: Some(d.resource_id),
                pending: Some(PendingStatus::Void),
                action_type: Some(ActionTypes::FILTER),
            }
        }).collect();
    }
    
    // let bookmarks = bookmarks_data.unwrap().data.data;
    // let collectable_bookmarks : Vec<Collectable> = bookmarks.iter().map(|d| {
    //     Collectable {
    //         _id: Collectable::maybe_string_id(d._id.clone()),
    //         resource_type: Some(d.resource_type),
    //         resource_id: Some(d.resource_id),
    //         pending: None,
    //         action_type: Some(ActionTypes::BOOKMARK),
    //     }
    // }).collect();

    // let annotations = annotations_data.unwrap().data.data;
    // let collectable_annotations : Vec<Collectable> = annotations.iter().map(|d| {
    //     Collectable {
    //         _id:  Collectable::maybe_string_id(d._id.clone()),
    //         resource_type: Some(d.resource_type),
    //         resource_id: Some(d.resource_id),
    //         pending: None,
    //         action_type: Some(ActionTypes::ANNOTATION),
    //     }
    // }).collect();

    let mut actions_hash = HashMap::new();

    actions_hash.insert(ActionTypes::BOOKMARK, collectable_bookmarks);//collectable_bookmarks);
    actions_hash.insert(ActionTypes::ANNOTATION, collectable_annotations);//collectable_annotations);
    actions_hash.insert(ActionTypes::FILTER, collectable_filters);

    actions_hash
}