use std::rc::Rc;
use fixedstr::fstr;

use crate::{
    appdata::stores::{
        store_app_types::{ 
            Collectable, 
            PendingStatus
        },
        store_app::StoreApp,
    }, 
    traits::ActionTypes
};

pub fn is_pending (c: &Collectable) -> bool {
    c.pending.unwrap() != PendingStatus::Void && c.pending.unwrap() != PendingStatus::Fresh
}

pub fn state_pending_actions (state: Rc<StoreApp>) -> Vec<Collectable> {

    // info!("########## state_pending_actions ########### state: Rc<StoreApp> :: {:?}", state);

    let mut pending_filters_collectables : Vec<Collectable> = state.filters
        .clone()
        .iter()
        .map(|a| Collectable{
            _id: Collectable::maybe_string_id(a._id.clone()),
            resource_id:Some(a.resource_id),
            resource_type: Some(a.resource_type),
            pending: Some(a.pending),
            action_type: Some(ActionTypes::FILTER),
            action_txt: None,
        })
        .collect();

    pending_filters_collectables.retain(|b: &Collectable| b.pending.is_some() && is_pending(b));     

    let mut pending_bookmarks_collectables : Vec<Collectable> = state.bookmarks
        .clone()
        .iter()
        .map(|a| Collectable{
            _id: Collectable::maybe_string_id(a._id.clone()),
            resource_id:Some(a.resource_id),
            resource_type: Some(a.resource_type),
            pending: Some(a.pending),
            action_type: Some(ActionTypes::BOOKMARK),
            action_txt: None,
        }).collect();

    pending_bookmarks_collectables.retain(|b: &Collectable| b.pending.is_some()  && is_pending(b));     

    let mut pending_annotations_collectables : Vec<Collectable> = state.annotations
        .clone()
        .iter()
        .map(|a| Collectable{
            _id: Collectable::maybe_string_id(a._id.clone()),
            resource_id:Some(a.resource_id),
            resource_type: Some(a.resource_type),
            pending: Some(a.pending),
            action_type: Some(ActionTypes::ANNOTATION),
            action_txt: Some(fstr::make(a.text.as_str())),
        }).collect();

    pending_annotations_collectables.retain(|b: &Collectable| b.pending.is_some()  && is_pending(b));

    let all_pending = [
        pending_annotations_collectables.clone(), 
        pending_bookmarks_collectables.clone(), 
        pending_filters_collectables.clone()
    ].concat();

    all_pending
}