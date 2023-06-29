use yew::{
    function_component,
    html,
    UseStateHandle,
    Html,
    Properties,
};
use yewdux::prelude::use_store;

use crate::{
    components::widget::{
        base_list::BaseListComponent,
        tech::TechComponent,
    },
    models::ModelTypes, 
    traits::{ 
        can_annotate::Annotation, 
        can_bookmark::Bookmark
    }, 
    appdata::stores::{
        store_app::StoreApp
    },
    util::{
        resource_for_actions::{ set_state_modal_item}, 
        action_for_resource::resource_annotation
    },
};


#[derive( PartialEq, Properties)]
pub struct ProjectDetailProps {
    pub selected_project_uid:  Option<usize>,
    // pub set_modal_item: Callback<Actionable>,
    // pub store: UseReducerHandle<StoreState>,
}

#[function_component(ProjectDetailComponent)]
pub fn job_detail(ProjectDetailProps { 
        // store,
        selected_project_uid, 
        // set_modal_item 
    } : &ProjectDetailProps) -> Html {
        
    // let ctx = use_context::<UseReducerHandle<StoreState>>().unwrap();
    // let c_ctx = ctx.clone();

    let (state, dispatch) = use_store::<StoreApp>();

    if selected_project_uid.is_some() {

        let static_mods = state.static_models.clone();
        let hashes = static_mods.model_hashes.projects.clone();

        let proj_id = selected_project_uid.unwrap();

        let proj_opt = hashes.get(&proj_id);

        if proj_opt.is_none() {

            return html!{
                <></>
            }
        }

        let project = proj_opt.unwrap();

        let notes: Vec<Annotation> = state.annotations.clone().to_vec();
        let bookmarks: Vec<Bookmark> = state.bookmarks.clone().to_vec();
        
        let project_note = resource_annotation(ModelTypes::Job, &project.uid, &notes);
        
        let bookmarked =  bookmarks
            .iter()
            .fold(false, |acc, n: &Bookmark| {

                if acc {
                    return true
                }

                n.resource_id == project.uid && n.resource_type == ModelTypes::Project
            });

        let mut c_name = "StyledJobDetail";

        if bookmarked { c_name = "bookmarked"; }

        let c_project = project.clone();

        html! {
            <div class={ c_name }>
                <h2 onclick={ move |_| { 
                    set_state_modal_item(dispatch.clone(), ModelTypes::Project, c_project.uid)
                }}>
                    <span class="action-wrap">
                        <span class="html-icon">{ "\u{002B}" }</span>
                        <span>{ &project.name }</span>
                    </span>
                    
                </h2>
                <p class="margin-b">
                    <a href={ project.repo.clone() } target="_blank">
                        <strong>{ "Github Repo" }</strong>
                    </a>
                </p>
                {
                    if project_note.is_some() {
                        html! {
                            <div class="margin-b">
                                <p>{ project_note.unwrap().text }</p>
                            </div>
                        }
                    } else {
                        html!{ <></> }
                    }
                }
                <div class="margin-m">
                    <BaseListComponent
                        list_items={ project.description.clone() }
                    />
                </div>
                <TechComponent
                    job_uid={ project.uid }
                    actionable={ true }
                    job_techs={ project.tech.clone() }
                />
            </div>        
        }
    } else {
        html!{
            <></>
        }
    }
}