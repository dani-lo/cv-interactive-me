use std::{collections::HashMap};
use itertools::Itertools;
use log::info;
use yew::{
    prelude::*, 
};
use yew_router::prelude::use_navigator;
use yewdux::prelude::use_store;

use fixedstr::fstr;

use crate::{
    routes::AppRoute,
    appdata::stores::{
        store_app_types:: { 
            Collectable,
            PendingStatus,
        }, 
        store_app::StoreApp, store_ui::StoreUI
    }, 
    util::{
        sort_group::collectionables_vector_to_grouped_hash, 
        resource_name::{resource_name, ResourceName},
        parent_resource::parent_resource_or_self,
        wasm_bridge::scroll_to_slot,
    },
    models::{
        Model,
        ModelTypes
    },
    traits::{
        can_annotate::Annotation,
        can_bookmark::Bookmark,
        can_filter::Filter,
        ActionTypes
    },
};

#[function_component(ActionsListComponent)]
pub fn actions_list ()  -> Html { 
    
    let (state, _dispatch) = use_store::<StoreApp>();
    let (ui_state, ui_dispatch) = use_store::<StoreUI>();

    let payoff_ui_dipatcher = ui_dispatch.clone();

    let mut annotations = state.annotations.clone();
    annotations.retain(|n| n.pending != PendingStatus::Fresh && n.pending != PendingStatus::VoidThenDeleted);

    let mut bookmarks = state.bookmarks.clone();
    bookmarks.retain(|b| b.pending != PendingStatus::Fresh && b.pending != PendingStatus::VoidThenDeleted);

    let mut filters = state.filters.clone();
    filters.retain(|f| f.pending != PendingStatus::Fresh && f.pending != PendingStatus::VoidThenDeleted);

    let actionable_bookmarks = bookmarks
        .iter()
        .map(|f| {
            return Collectable 
            { 
                _id: Collectable::maybe_string_id(f._id.clone()),
                resource_id: Some(f.resource_id), 
                resource_type: Some(f.resource_type),
                pending: Some(f.pending),
                action_type: Some(ActionTypes::BOOKMARK),
                action_txt: None,
            };
        })
        .collect::<Vec<Collectable>>();
    
    let actionable_annotations = annotations
        .iter()
        .map(|f| {
            return Collectable 
            { 
                _id: Collectable::maybe_string_id(f._id.clone()),
                resource_id: Some(f.resource_id), 
                resource_type: Some(f.resource_type),
                pending: Some(f.pending),
                action_type: Some(ActionTypes::ANNOTATION),
                action_txt: Some(fstr::make(f.text.as_str())),
            };
        })
        .collect::<Vec<Collectable>>();
    
    let actionable_filters = filters
        .iter()
        .map(|f| {
            return Collectable 
            { 
                _id: Collectable::maybe_string_id(f._id.clone()),
                resource_id: Some(f.resource_id), 
                resource_type: Some(f.resource_type),
                pending: Some(f.pending),
                action_type: Some(ActionTypes::FILTER),
                action_txt: None,
            };
        })
        .collect::<Vec<Collectable>>();
    
    let ordered_bookmark_hashes = collectionables_vector_to_grouped_hash(actionable_bookmarks);
    let ordered_annotations_hashes = collectionables_vector_to_grouped_hash(actionable_annotations);
    let ordered_filter_hashes = collectionables_vector_to_grouped_hash(actionable_filters);
    
    html! {
        <>
            <div>
            <h3>{ "Your Filters" }</h3>
            {
                if filters.len() > 0 { 
                    html!{
                        <ActionListActionablesComponent
                            ordered_actionable_hashes = { ordered_filter_hashes }
                            collectable_type = { "filter" }
                        />
                    }
                        
                } else { 
                    html!{
                        <p class="xplain-actions">{"To add filters please use the plus action button ("}<i class="fa fa-plus" />{") within filterable CV items"}</p>
                    }
                }
            }
            </div>
            <div>
            <h3>{ "Your Bookmarks" }</h3>
            {
                if bookmarks.len() > 0 { 
                    html!{
                        <ActionListActionablesComponent
                            ordered_actionable_hashes = { ordered_bookmark_hashes }
                            collectable_type = { "bookmark" }
                        />
                    }
                    
                } else { 
                    html!{
                    <p class="xplain-actions">
                        {"To add bookmarks please use action button ("}
                        <i class="fa fa-plus" />
                        {") within bookmarkable CV items"}
                    </p>
                    }
                }
            }
            </div>
            <div>
                <h3>{ "Your Annotations" }</h3>
                {
                    if annotations.len() > 0 { 
                        html!{
                            <ActionListActionablesComponent
                                ordered_actionable_hashes = { ordered_annotations_hashes }
                                collectable_type = { "annotation" }
                            />
                        }
                        
                    } else { 
                        html!{
                            <p class="xplain-actions">{"To add notes please use the action button ("}<i class="fa fa-plus" />{") within annotateable CV items"}</p>
                        }
                    }
                }
            </div>
        </>       
    }
}

#[derive(Clone, PartialEq, Properties)]
pub struct ActionListActionablesProps {
    ordered_actionable_hashes:HashMap<ModelTypes, Vec<Collectable>>,
    collectable_type: &'static str,
}

#[function_component]
pub fn ActionListActionablesComponent(ActionListActionablesProps { 
        ordered_actionable_hashes, 
        collectable_type, 
    } : &ActionListActionablesProps) -> Html {
    
    let (_ui_state, ui_dispatch) = use_store::<StoreUI>();
    let (state, _dispatch) = use_store::<StoreApp>();

    let active_filters = state.filters.iter().filter(|f| 
        f.pending == PendingStatus::Void || 
        f.pending == PendingStatus::VoidThenEdited || 
        f.pending == PendingStatus::Added
    ).collect::<Vec<&Filter>>();

    let has_filters = active_filters.len() > 0;

    let nav = use_navigator().unwrap();
    let (state, dispatch) = use_store::<StoreApp>();

    let static_models = state.static_models.clone();

    let list_tems = ordered_actionable_hashes.keys().sorted().into_iter().map(|key: &ModelTypes| {

        let actionables_vec: Option<&Vec<Collectable>> = ordered_actionable_hashes.get(&key);

        html!{
            
            actionables_vec.unwrap().iter().map(|f: &Collectable| {

                let action_type = f.action_type.unwrap();
                let resource_id = f.resource_id.unwrap();
                let resource_type_type = f.resource_type.unwrap();

                let res_name: ResourceName = resource_name(
                    &static_models.model_hashes,
                    f.resource_type.unwrap(),
                    f.resource_id.unwrap(),
                );

                let parent  = parent_resource_or_self(
                    &static_models.model_hashes,
                    f.resource_id.unwrap(),
                    f.resource_type.unwrap(),
                );
                
                let n = nav.clone();
                let dispatcher = dispatch.clone();

                let sidebar_jobs_ui_dipatcher = ui_dispatch.clone();
                
                let on_click_browseable_resource: yew::Callback<Option<MouseEvent>> = Callback::from(move |_| { 

                    sidebar_jobs_ui_dipatcher.reduce_mut(|s| s.toggle_sidebar_ui());

                    if resource_type_type == ModelTypes::Project {
                        n.push(&AppRoute::ProjectsDetailRoute { uid: resource_id });
                    } else if resource_type_type == ModelTypes::Job {
                        n.push(&AppRoute::JobsDetailRoute { uid: resource_id });
                    } else if resource_type_type == ModelTypes::Company && parent.is_some() {
  
                        let parent_id = parent.unwrap().0;

                        n.push(&AppRoute::JobsDetailRoute { uid: parent_id });
                    }

                    scroll_to_slot(resource_id);
                });
                 
                let  mut item_cname = "";

                if has_filters && parent.is_some() {

                    let actual_parent_type = parent.unwrap().1;
                    let actual_parent_id = parent.unwrap().0;

                    if actual_parent_type == ModelTypes::Job {

                        let job_opt = &static_models.model_hashes.jobs.get(&actual_parent_id);

                        if job_opt.is_some() {
                            
                            let job = job_opt.unwrap();

                            if !job.included_in_filters(&state.filters) {
                                item_cname = "disabled";
                            }
                        }
                        
                    } else if actual_parent_type == ModelTypes::Project {

                        let project_opt = &static_models.model_hashes.projects.get(&actual_parent_id);

                        if project_opt.is_some() {

                            let project = project_opt.unwrap();

                            if !project.included_in_filters(&state.filters) {
                                item_cname = "disabled";
                            }
                        }
                    }
                }

                html!{
                    <li class="itemised action-wrap">
                        <span>
                            <strong>{ res_name.type_name }</strong>
                            {": "}
                            <ActionsListLinkComponent 
                                item={ parent } 
                                item_cname={ item_cname }
                                text={ res_name.name } 
                                on_click_browseable_resource={ on_click_browseable_resource }
                            />
                        </span>
                        <span  
                            class="html-icon" 
                            onclick={ move |_| {
                                dispatcher.reduce_mut(|s| {

                                    if action_type == ActionTypes::ANNOTATION {
                                        s.remove_annotation(Annotation {
                                            _id: None,
                                            resource_id: resource_id,
                                            resource_type: resource_type_type,
                                            text: "".to_string(),
                                            pending: PendingStatus::Unknown,
                                        });
                                    } else if action_type == ActionTypes::BOOKMARK {
                                        s.remove_bookmark(Bookmark {
                                            _id: None,
                                            resource_id: resource_id,
                                            resource_type: resource_type_type,
                                            pending: PendingStatus::Unknown,
                                        });
                                    } else {
                                        s.remove_filter(Filter {
                                            _id: None,
                                            resource_id: resource_id,
                                            resource_type: resource_type_type,
                                            pending: PendingStatus::Unknown,
                                        })
                                    }
                                })
                            }}>
                            <i class="fa fa-times" aria-hidden="true" />
                        </span>
                    </li>
                }
            }).collect::<Html>()
        }
    }).collect::<Html>();
    
    
    html!{
        <ul class="StyledActionsList">
        {
            list_tems
        }
        </ul>
    }
}


#[derive( PartialEq, Properties)]
pub struct ActionsListLinkProps {
    pub item: Option<(usize, ModelTypes)>,
    pub text: String,
    pub on_click_browseable_resource: yew::Callback<Option<MouseEvent>>,
    pub item_cname: String,
}


#[function_component(ActionsListLinkComponent)]
pub fn actions_list_link (ActionsListLinkProps { 
        item, 
        text,
        item_cname,
        on_click_browseable_resource } : &ActionsListLinkProps)  -> Html { 

    if item.is_none() {
        return html!{ 
            <span>{ text }</span> 
        };
    } else {

        let on_click = on_click_browseable_resource.clone();

        return html!{ 
            <a class={ item_cname } onclick={ move |_| on_click.emit(None) }>{ text }</a> 
        }
    }
}
