use std::cmp::Ordering;

use yew::{
    Html, 
    Properties, 
    Callback, 
    function_component, 
    html, 
    use_effect_with_deps, 
};

use yewdux::prelude::use_store;

use crate::appdata::stores::{
    store_app_types::PendingStatus,
    store_app::StoreApp,
};

use crate::components::jobs::job::JobComponent;

use crate::models::{
    Model,
    ModelTypes,
    job_model::JobModel,
};

use crate::traits::{
    can_annotate::Annotation,
    can_bookmark::Bookmark,
    can_filter::Filter,
};
use crate::util::wasm_bridge::scroll_to_slot;

#[derive(Properties, PartialEq)]
pub struct JobListProps {
   pub jobs: Vec<JobModel>,
   pub on_select_job_detail:  Callback<usize>,
   pub active_job_id: usize,
}

#[function_component(JobsListComponent)]
pub fn job_list(JobListProps { 
        jobs, 
        on_select_job_detail, 
        active_job_id }: &JobListProps) -> Html {
    
    let selected_id = *active_job_id;

    use_effect_with_deps(move|_| {
        if selected_id > 0 {
            scroll_to_slot(selected_id);
        }
    }, ());

    let (state, _dispatch) = use_store::<StoreApp>();
    
    let notes: Vec<Annotation> = state.annotations.clone().to_vec();
    let bookmarks: Vec<Bookmark> = state.bookmarks.clone().to_vec();
    
    let has_job_bookmarks = bookmarks.iter().any(|b : &Bookmark| b.resource_type == ModelTypes::Job);
         
    let active_filters = state.filters.iter().filter(|f| 
        f.pending == PendingStatus::Void || 
        f.pending == PendingStatus::VoidThenEdited || 
        f.pending == PendingStatus::Added
    ).collect::<Vec<&Filter>>();

    let has_filters = active_filters.len() > 0;
    
    let mut anything_rendered = 0;

    let mut c_jobs = jobs.clone();
    
    c_jobs.sort_by(|a, b| {
        if a < b { Ordering::Greater } 
        else if a > b { Ordering::Less } 
        else { Ordering::Equal }
    });

    let jobs_list = c_jobs.iter().map(|job| {
         
        if  has_filters && !job.included_in_filters(&state.filters) {

            return html!{
                <></>
            }
        } else {
            anything_rendered = anything_rendered + 1
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
    }).collect::<Html>();

    let container_cname = if *active_job_id == 0 { "jobs-container" } else { "jobs-container with-selected" };

    html!{

        {
            if anything_rendered == 0 {
                html!{ 
                    <div class="StyledInlineWarning">
                        <p>{ "No Jobs found - it looks like all  might be filtered out!" }</p>
                        <p>{ "Try removing some filters"}</p>
                    </div>
                }
            } else {
                html!{
                    <div class={ container_cname }>
                    {
                        html!{ jobs_list }
                    }
                    </div>
                }
            }
        }
    }
}


