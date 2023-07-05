use std::collections::HashMap;

use log::info;
use serde::{Deserialize, Serialize};
use yewdux::store::Store;


use crate::models::ModelTypes;
use crate::traits::ActionTypes;
use crate::traits::can_annotate::Annotation;
use crate::traits::can_bookmark::Bookmark;
use crate::traits::can_filter::Filter as Filter;
use crate::appdata::stores::store_app_types::{
    PendingStatus,
    AppStaticDataHashes,
};
use crate::util::identity::actionables_ident;

use super::store_app_types::{Actionable, StaticModels, Collectable};


#[derive(Default, Debug, Eq, PartialEq, Clone, Serialize, Deserialize, Store)]
pub struct StoreApp {
    pub annotations: Vec<Annotation>,
    pub bookmarks:  Vec<Bookmark>,
    pub filters: Vec<Filter>,
    pub modal_item: Actionable,
    pub static_models: StaticModels,
}


impl StoreApp {

    fn clear_fresh (&mut self) {
        self.annotations.retain(|a| a.pending != PendingStatus::Fresh);
    }

    pub fn add_bookmark (
        self: &mut Self,
        bookmark: Bookmark) {
    
        // let bookmarks : Vec<Bookmark> = self.bookmarks;

        let existing = self.bookmarks
            .iter()
            .find(|&x| actionables_ident(&bookmark, x));
        
        if existing.is_some() {
            
            let existing_val = existing.unwrap();

            if existing_val.pending == PendingStatus::Deleted {
                let index: usize = self.bookmarks
                    .iter()
                    .position(|b: &Bookmark| actionables_ident(&bookmark, b))
                    .unwrap();

                self.bookmarks[index].pending = PendingStatus::Added;
            }
        } else {
            self.bookmarks.push(bookmark);
        }

    }

    pub fn add_filter (
        self: &mut Self,
        filter: Filter) {
    
        let existing = self.filters
            .iter()
            .find(|&x| actionables_ident(&filter, x));
        
        if existing.is_some() {
            
            let existing_val = existing.unwrap();

            if existing_val.pending == PendingStatus::Deleted {
                let index: usize = self.filters
                    .iter()
                    .position(|b: &Filter| actionables_ident(&filter, b))
                    .unwrap();

                self.filters[index].pending = PendingStatus::Added;
            }
        } else {
            self.filters.push(filter);
        }
    }

    pub fn add_annotation (
        self: &mut Self,
        annotation: Annotation) {
    
        let existing = self.annotations
            .iter()
            .find(|&x| actionables_ident(&annotation, x) && x.pending != PendingStatus::Fresh);
        
        info!("Store:: add note .....");
        info!("Store annotations are these");
        info!("{:?}", self.annotations);

        if existing.is_some() {
            
            info!("Store:: existing is true, here it is! .....");
            info!("{:?}", existing);

            let existing_val = existing.unwrap();

            let index: usize = self.annotations
                    .iter()
                    .position(|b: &Annotation| actionables_ident(&annotation, b))
                    .unwrap();

            if existing_val.pending == PendingStatus::Deleted {
                
                self.annotations[index].pending = PendingStatus::Void;
            } else {

                let curr_pending = self.annotations[index].pending.clone();

                self.annotations[index].pending = if curr_pending == PendingStatus::Void { PendingStatus::VoidThenEdited } else { PendingStatus::Added }
            }
        } else {
            info!("Store:: existing is false, just add .....");

            self.annotations.push(annotation);
        }

        info!("here are the new annotatons after the addibng OP");
        info!("{:?}", self.annotations);

        info!("Store:: <<< DONE>>>");
    }

    pub fn edit_annotation (
        self: &mut Self,
        annotation: Annotation) {
    
        let existing = self.annotations
            .iter()
            .find(|&x| actionables_ident(&annotation, x) && x.pending != PendingStatus::Fresh);
        
        info!("Store:: add note .....");
        info!("Store annotations are these");
        info!("{:?}", self.annotations);

        if existing.is_some() {
            
            info!("Store:: existing is true, here it is! .....");
            info!("{:?}", existing);

            let existing_val = existing.unwrap();

            if existing_val.pending == PendingStatus::Deleted {
                let index: usize = self.annotations
                    .iter()
                    .position(|b: &Annotation| actionables_ident(&annotation, b))
                    .unwrap();

                self.annotations[index].pending = PendingStatus::Added;
            }
        } else {
            info!("Store:: existing is false, just add .....");

            self.annotations.push(annotation);
        }

        info!("here are the new annotatons after the addibng OP");
        info!("{:?}", self.annotations);

        info!("Store:: <<< DONE>>>");
    }

    pub fn remove_bookmark (
        self: &mut Self, 
        bookmark: Bookmark) {

        let existing = self.bookmarks
            .iter()
            .find(|&x| actionables_ident(&bookmark, x));
            

        if existing.is_some() {

            let existing_val = existing.unwrap();

            if existing_val.pending == PendingStatus::Added{

                self.bookmarks
                    .retain(|b: &Bookmark| actionables_ident(&bookmark, b))  
            } else {
                
                let index: usize = self.bookmarks
                    .iter()
                    .position(|b: &Bookmark| actionables_ident(&bookmark, b))
                    .unwrap();

                self.bookmarks[index].pending = if existing_val.pending == PendingStatus::Void { PendingStatus::VoidThenDeleted } else { PendingStatus::Deleted };
            }
        }  
    }


    pub fn remove_annotation (
        self: &mut Self, 
        annotation: Annotation) {

        let existing = self.annotations
            .iter()
            .find(|&x| actionables_ident(&annotation, x));
            

        if existing.is_some() {

            let existing_val = existing.unwrap();

            if existing_val.pending == PendingStatus::Added{

                self.annotations
                    .retain(|b: &Annotation| actionables_ident(&annotation, b))  
            } else {
                
                let index: usize = self.annotations
                    .iter()
                    .position(|b: &Annotation| actionables_ident(&annotation, b))
                    .unwrap();

                self.annotations[index].pending = if existing_val.pending == PendingStatus::Void { PendingStatus::VoidThenDeleted } else { PendingStatus::Deleted };
            }
        }  
    }


    pub fn remove_filter (
            self: &mut Self, 
            filter: Filter) {
        
        let existing = self.filters
            .iter()
            .find(|&x| actionables_ident(&filter, x));
                
        if existing.is_some() {

            let existing_val = existing.unwrap();

            if existing_val.pending == PendingStatus::Added{

                self.filters
                    .retain(|f: &Filter| {
                        !actionables_ident(&filter, f)
                    });
                        
            } else {
                
                let index: usize = self.filters
                    .iter()
                    .position(|f: &Filter| actionables_ident(&filter, f))
                    .unwrap();
                
                self.filters[index].pending = if existing_val.pending == PendingStatus::Void { PendingStatus::VoidThenDeleted } else { PendingStatus::Deleted };
            }
        }  
    }

    pub fn set_modal_item (
            self: &mut Self, 
            resource_type: ModelTypes,
            resource_id: usize) {
    
        self.modal_item.update(resource_type, resource_id);
    }

    pub fn unset_modal_item (
            self: &mut Self) {

        self.modal_item.reset();
        self.clear_fresh();
    }

    pub fn set_static_models(
            self: &mut Self,
            model_hashes: AppStaticDataHashes) {

        self.static_models.set_models(model_hashes);
    }

    pub fn flush_pending (self: &mut Self) {

        self.clear_fresh();

        let new_filters = self.filters
            .clone()
            .iter()
            .map(|d| Filter {
                _id: d._id.clone(),
                resource_id: d.resource_id,
                resource_type: d.resource_type,
                pending: if d.pending == PendingStatus::VoidThenDeleted { PendingStatus::Void } else { d.pending },
            })
            .filter(|d| d.pending == PendingStatus::Void)
            .collect();

        let new_annotations = self.annotations
            .clone()
            .iter()
            .map(|d| Annotation {
                _id: d._id.clone(),
                resource_id: d.resource_id,
                resource_type: d.resource_type,
                pending: if d.pending == PendingStatus::VoidThenDeleted { PendingStatus::Void } else { d.pending },
                text: "tmp".to_string(),
            })
            .filter(|d| d.pending == PendingStatus::Void)
            .collect();

        let new_bookmarks = self.bookmarks
            .clone()
            .iter()
            .map(|d| Bookmark {
                _id: d._id.clone(),
                resource_id: d.resource_id,
                resource_type: d.resource_type,
                pending: if d.pending == PendingStatus::VoidThenDeleted { PendingStatus::Void } else { d.pending },
            })
            .filter(|d| d.pending == PendingStatus::Void)
            .collect();

        self.filters = new_filters;
        self.annotations = new_annotations;
        self.bookmarks = new_bookmarks;
    }

    pub fn apply_processed_pending (
            self: &mut Self,
            user_actions_hash: HashMap<ActionTypes, Vec<Collectable>>) {

        self.clear_fresh();
        
        let new_filters: Vec<Filter> = self.filters
            .clone()
            .iter()
            .map(|d| {

                let processed = user_actions_hash
                    .get(&ActionTypes::FILTER)
                    .unwrap()
                    .iter()
                    .find(|x| 
                        d.resource_type == x.resource_type.unwrap() &&
                        d.resource_id == x.resource_id.unwrap()
                    );

                Filter {
                    _id: d._id.clone(),
                    resource_id: d.resource_id,
                    resource_type: d.resource_type,
                    pending: if processed.is_some() { PendingStatus::Void } else { d.pending }
                }
            })
            .filter(|d| d.pending == PendingStatus::Void)
            .collect();

        let new_bookmarks: Vec<Bookmark> = self.bookmarks
            .clone()
            .iter()
            .map(|d| {

                let processed = user_actions_hash
                    .get(&ActionTypes::BOOKMARK)
                    .unwrap()
                    .iter()
                    .find(|x| 
                        d.resource_type == x.resource_type.unwrap() &&
                        d.resource_id == x.resource_id.unwrap()
                    );

                Bookmark {
                    _id: d._id.clone(),
                    resource_id: d.resource_id,
                    resource_type: d.resource_type,
                    pending: if processed.is_some() { PendingStatus::Void } else { d.pending }
                }
            })
            .filter(|d| d.pending == PendingStatus::Void)
            .collect();
        
        let new_annotations: Vec<Annotation> = self.annotations
            .clone()
            .iter()
            .map(|d| {

                info!("IN MAP ---- {:?}", d);
                let processed_opt = user_actions_hash
                    .get(&ActionTypes::ANNOTATION)
                    .unwrap()
                    .iter()
                    .find(|x| 
                        d.resource_type == x.resource_type.unwrap() &&
                        d.resource_id == x.resource_id.unwrap()
                    );
                
                if processed_opt.is_some() {

                    let processed = processed_opt.unwrap();

                    return Annotation {
                        _id: Some(processed._id.unwrap().to_string()),
                        resource_id: d.resource_id,
                        resource_type: d.resource_type,
                        pending: PendingStatus::Void,
                        text: processed.action_txt.unwrap().to_string().clone(),
                    };
                } else {
                    Annotation {
                        _id: d._id.clone(),
                        resource_id: d.resource_id,
                        resource_type: d.resource_type,
                        pending: d.pending,
                        text: d.text.clone(),
                    }
                }
                
            })
            .filter(|d| d.pending == PendingStatus::Void)
            .collect();
        
        info!("+++ new_annotations {:?}", new_annotations);

        self.filters = new_filters;
        self.annotations = new_annotations;
        self.bookmarks = new_bookmarks;
    }

    pub fn init_user_actions (
            self: &mut Self,
            user_actions_hash: HashMap<ActionTypes, Vec<Collectable>>) {
        
        let user_filters_collectable_vec = user_actions_hash.get(&ActionTypes::FILTER);
        let user_filters: Vec<Filter> = user_filters_collectable_vec.unwrap().iter().map(|d| {
            Filter::from_collectable(d)
        }).collect();

        self.filters = user_filters.clone();

        let user_annotations_collectable_vec = user_actions_hash.get(&ActionTypes::ANNOTATION);
        let user_annotations: Vec<Annotation> = user_annotations_collectable_vec.unwrap().iter().map(|d| {
            Annotation::from_collectable(d)
        }).collect();

        self.annotations = user_annotations.clone();

        let user_bookmarks_collectable_vec = user_actions_hash.get(&ActionTypes::BOOKMARK);
        let user_bookmarks: Vec<Bookmark> = user_bookmarks_collectable_vec.unwrap().iter().map(|d| {
            Bookmark::from_collectable(d)
        }).collect();

        self.bookmarks = user_bookmarks.clone();
    }

    pub fn note_text (
            self: &mut Self, 
            note_str: String, 
            res_id: usize, 
            res_type: ModelTypes) {
        
        let existing_index: Option<usize> = self.annotations
            .iter()
            .position(|a: &Annotation| a.resource_id == res_id && a.resource_type == res_type && a.pending != PendingStatus::Fresh);
        

        let fresh_index: Option<usize> = self.annotations
            .iter()
            .position(|a: &Annotation| a.pending == PendingStatus::Fresh);

        if existing_index.is_none() {    

            if fresh_index.is_none() {
                self.annotations.push(Annotation {
                    _id: None,
                    resource_id: res_id.clone(),
                    resource_type: res_type.clone(),
                    pending: PendingStatus::Fresh,
                    text: note_str,
                });
            } else {
                self.annotations[fresh_index.unwrap()].text = note_str; 
            }
            
        } else {
            self.annotations[existing_index.unwrap()].text = note_str; 
        }
    }

    pub fn fresh_note_reset (self: &mut Self) {

        let index_opt: Option<usize> = self.annotations
                    .iter()
                    .position(|b: &Annotation| b.pending == PendingStatus::Fresh);

        if index_opt.is_some() {
            let index = index_opt.unwrap();

            self.annotations[index].text = "".to_string();
        }
    }
}