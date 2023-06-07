use yew::{
    function_component,
    html,
    UseStateHandle,
    Html,
    Properties,
};
use yewdux::prelude::use_store;

use crate::{
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
    pub selected_project_uid:  UseStateHandle<Option<usize>>,
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

        let mut c_name = "StyledJobDetailContainer";

        if bookmarked { c_name = "bookmarked"; }
        
        // let select_project_for_actions = on_select_resource_for_actions(
        //     ModelTypes::Project,
        //     store.clone()
        // );

        let c_project = project.clone();

        html! {
            <div class={ c_name }>
                <h2>
                    <span class="action-wrap">
                        <i 
                            class="action fa fa-plus" 
                            onclick={ move |_| { 
                                // select_project_for_actions.emit(c_project.uid);
                                set_state_modal_item(dispatch.clone(), ModelTypes::Project, c_project.uid)
                            }} 
                        />
                        <span>{ &project.name }</span>
                    </span>
                </h2>
                {
                    if project_note.is_some() {
                        html! {
                            <div>
                                <p>{ project_note.unwrap().text }</p>
                            </div>
                        }
                    } else {
                        html!{ <></> }
                    }
                }
                // {
                //     if project.company.is_some() {
                //        html!{ 
                //             <CompanyComponent
                //                 set_modal_item  = { set_modal_item.clone() }
                //                 company={ job.company.clone().unwrap() }
                //                 store={ store.clone() }
                //             />
                //         }
                //     } else {
                //         html!{
                //             <h3>{"Various agencies"}</h3>
                //         }
                //     }
                // }
                
                // <h3> { "Job type:" }</h3>
                // <JobTypeComponent
                //     set_modal_item  = { set_modal_item.clone() }
                //     job_jobtypes={ job.job_type.clone() }
                //     actionable={ true }
                // />
                // <ul  class="StyledJobDescriptionList">
                //     <JobsDescriptionListComponent 
                //         description={ c_job.description } 
                //     />
                // </ul>
                // <JobTechComponent
                //     job_uid={ job.uid }
                //     actionable={ true }
                //     job_techs={ c_job.tech }
                //     set_modal_item  = { set_modal_item.clone() }
                // />
            </div>        
        }
    } else {
        html!{
            <div></div>
        }
    }
}

// #[derive(Properties, PartialEq)]
// pub struct JobDescriptionItemProps {
//     description_item: String,
// }


// #[function_component(JobsDescriptionListItemComponent)]
// pub fn job_detail(JobDescriptionItemProps { description_item }: &JobDescriptionItemProps) -> Html {

//     html! {  <li>{ description_item }</li> }
// }


#[derive(Properties, PartialEq)]
pub struct JobDescriptionListProps {
    description: Vec<String>,
}

#[function_component(JobsDescriptionListComponent)]
pub fn job_list(JobDescriptionListProps { description }: &JobDescriptionListProps) -> Html {

    description.iter().map(|d: &String| {
        html! {
            <li>{ d }</li>
        }
    }).collect()
}