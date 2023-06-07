use log::info;
use yew::{
    Html, 
    Properties, 
    Callback, 
    function_component, 
    html, 
};

use serde::{
    Deserialize, 
    Serialize
};
use yewdux::prelude::use_store;

use crate::appdata::stores::{
    store_app_types::PendingStatus,
    store_app::StoreApp,
};
use crate::components::jobs::job::JobComponent;
use crate::models::Model;
use crate::models::{
    ModelTypes,
    job_model::JobModel,
};
use crate::traits::can_filter::Filter;
use crate::traits::{
    can_annotate::Annotation,
    can_bookmark::Bookmark,
};

#[derive(Properties, PartialEq)]
pub struct JobListProps {
   pub jobs: Vec<JobModel>,
   pub on_select_job_detail:  Callback<usize>,
//    pub set_modal_item: Callback<Actionable>,
//    pub store: UseReducerHandle<StoreState>,
   pub active_job_id: usize,
}


#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct UrlParams {
    pub id: i32,
}

#[function_component(JobsListComponent)]
pub fn job_list(JobListProps { 
        jobs, 
        on_select_job_detail, 
        // set_modal_item, 
        // store,
        active_job_id }: &JobListProps) -> Html {

    let (state, _dispatch) = use_store::<StoreApp>();
    
    // info!("{:?}", store);
    let notes: Vec<Annotation> = state.annotations.clone().to_vec();
    let bookmarks: Vec<Bookmark> = state.bookmarks.clone().to_vec();
    
    let has_job_bookmarks = bookmarks.iter().any(|b : &Bookmark| b.resource_type == ModelTypes::Job);
         
    let active_filters = state.filters.iter().filter(|f| 
        f.pending == PendingStatus::Void || 
        f.pending == PendingStatus::VoidThenEdited || 
        f.pending == PendingStatus::Added
    ).collect::<Vec<&Filter>>();

    let has_filters = active_filters.len() > 0;
    info!("HAS FILTERS ?????????? {}", has_filters);

    jobs.iter().map(|job| {
        
        if  has_filters && !job.included_in_filters(&state.filters) {
            // info!("JOB FILTERED OUT....{}", job.uid);
            return html!{
                <></>
            }
        }

        notes.clone()
            .retain(|n: &Annotation| n.resource_id == job.uid && n.resource_type == ModelTypes::Job);
        
        let bookmark =  bookmarks
            .iter()
            .find(|n| {
                return n.resource_id == job.uid &&  n.resource_type == ModelTypes::Job && (n.pending == PendingStatus::Added || n.pending == PendingStatus::Void || n.pending == PendingStatus::VoidThenEdited)
            });
        
        html! {
            <JobComponent 
                on_select_job_detail={ on_select_job_detail } 
                job={ job.clone() }
                bookmarked={ has_job_bookmarks && bookmark.is_some() }
                job_annotations={ notes.clone() }
                selected={ *active_job_id == job.uid }
            />
        }
    }).collect()
}


