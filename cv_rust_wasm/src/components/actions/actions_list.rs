use std::{collections::HashMap, fmt::format};

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
        store_app::StoreApp
    }, 
    util::{
        sort_group::collectionables_vector_to_grouped_hash, 
        resource_name::{resource_name, ResourceName},
        parent_resource::parent_resource_or_self,
    },
    models::ModelTypes,
    traits::{
        can_annotate::Annotation,
        can_bookmark::Bookmark,
        can_filter::Filter,
        ActionTypes
    },
};

#[derive( PartialEq, Properties)]
pub struct ActionsListLinkProps {
    pub item: Option<(usize, ModelTypes)>,
    pub text: String,
    pub on_click_browseable_resource: yew::Callback<Option<MouseEvent>>,
}


#[function_component(ActionsListLinkComponent)]
pub fn actions_list_link (ActionsListLinkProps { 
        item, 
        text,
        on_click_browseable_resource } : &ActionsListLinkProps)  -> Html { 

    if item.is_none() {
        return html!{ 
            <span>{ text }</span> 
        };
    } else {

        let on_click = on_click_browseable_resource.clone();

        return html!{ 
            <a onclick={ move |_| on_click.emit(None) }>{ text }</a> 
        }
    }
}

#[function_component(ActionsListComponent)]
pub fn actions_list ()  -> Html { 
    
    let (state, _dispatch) = use_store::<StoreApp>();

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
    
    info!("++++++ actionable_annotations");
    info!("{:?}", actionable_annotations);

    let ordered_bookmark_hashes = collectionables_vector_to_grouped_hash(actionable_bookmarks);
    let ordered_annotations_hashes = collectionables_vector_to_grouped_hash(actionable_annotations);
    let ordered_filter_hashes = collectionables_vector_to_grouped_hash(actionable_filters);

    info!("++++++ ordered_annotations_hashes");
    info!("{:?}", ordered_annotations_hashes);

    html! {
        <div>
            <div>
                <h3>{ "Filters" }</h3>
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
                                <p>{"You did not add any filters yet. To add filters please use the plus action button ("}<i className="fa fa-plus" />{") within filterable CV items"}</p>
                            }
                        }
                    }
                    <h3>{ "Bookmarks" }</h3>
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
                            <p>
                                {"You did not add any bookmarks yet. To add bookmarks please use action button ("}
                                <i className="fa fa-plus" />
                                {") within bookmarkable CV items"}
                            </p>
                           }
                       }
                   }
                   <h3>{ "Annotations" }</h3>
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
                        <p>{"You did not add any notes yet. To add notes please use the action button ("}<i className="fa fa-plus" />{") within annotateable CV items"}</p>
                       }
                   }
               }
                </div>
        </div>       
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
 
    let nav = use_navigator().unwrap();
    let (state, dispatch) = use_store::<StoreApp>();

    let static_models = state.static_models.clone();

    let list_tems = ordered_actionable_hashes.keys().into_iter().map(|key: &ModelTypes| {

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

                let on_click_browseable_resource: yew::Callback<Option<MouseEvent>> = Callback::from(move |_| { 

                    if resource_type_type == ModelTypes::Project {
                        n.push(&AppRoute::ProjectsDetailRoute { uid: resource_id });
                    } else {
                        n.push(&AppRoute::JobsDetailRoute { uid: resource_id });
                    }
                });
                
                html!{
                    <li class="action-wrap">
                        <span>
                            <strong>{ res_name.type_name }</strong>
                            {": "}
                            <ActionsListLinkComponent 
                                item={ parent } 
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