use std::cmp::Ordering;

use yew::{
    Html, 
    Properties, 
    Callback, 
    function_component, 
    html, 
    use_effect_with_deps, use_state, 
};

use yewdux::prelude::use_store;

use crate::appdata::stores::{
    store_app_types::PendingStatus,
    store_app::StoreApp,
};

use crate::components::{jobs::job::JobComponent, widget::tabber::TabberComponent};

use crate::models::StaticAsset;
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
use crate::util::chunker::{chunker, page_from_chunk};
use crate::util::wasm_bridge::{
    scroll_to_slot,
    scroll_top,
};

#[derive(Properties, PartialEq)]
pub struct JobListProps {
   pub jobs: Vec<JobModel>,
   pub on_select_job_detail:  Callback<usize>,
   pub active_job_id: usize,
   pub for_print: bool,
}

#[function_component(JobsListComponent)]
pub fn jobs_list_component(JobListProps { 
        jobs, 
        on_select_job_detail, 
        active_job_id,
        for_print 
    }: &JobListProps) -> Html {
        // return html!{ <p>{ html!{"sdsf"}}</p>};
    let selected_id = *active_job_id;

    use_effect_with_deps(move|_| {
        if selected_id > 0 {
            scroll_to_slot(selected_id);
        } else {
            scroll_top();
        }
    }, ());

    let mut sorted = jobs.clone();

    sorted.sort_by(|a, b| {
        if a < b { Ordering::Greater } 
        else if a > b { Ordering::Less } 
        else { Ordering::Equal }
    });

    let (state, _dispatch) = use_store::<StoreApp>();

    let page = use_state(|| 0);
    
    let notes: Vec<Annotation> = state.annotations.clone().to_vec();
    let bookmarks: Vec<Bookmark> = state.bookmarks.clone().to_vec();
    
    let has_job_bookmarks = bookmarks.iter().any(|b : &Bookmark| b.resource_type == ModelTypes::Job);
         
    let active_filters = state.filters.iter().filter(|f| 
        f.pending == PendingStatus::Void || 
        f.pending == PendingStatus::VoidThenEdited || 
        f.pending == PendingStatus::Added
    ).collect::<Vec<&Filter>>();

    let has_filters = active_filters.len() > 0;
    
    // let mut anything_rendered = 0;

    // let mut c_jobs = jobs.clone();
    let c_jobs = sorted.clone();
    
    let chunks : Vec<Vec<JobModel>> = chunker(sorted.clone(), 4);
    let curr_chunk = &chunks[*page];

    let active_job_id_c = active_job_id.clone();

    let p = page_from_chunk(c_jobs, active_job_id, 4);
    let c_page = page.clone();
    let c_c_page = page.clone();

    let on_select_tab = Callback::from( move |page_num: usize| {  

        if page_num != *c_c_page {
            c_c_page.set(page_num);
        }
    });

    use_effect_with_deps(move |_| {

        if active_job_id_c  != 0 {

            if p != *c_page {
                c_page.set(p);
            }
        }
    }, active_job_id.clone());

    let jobs_list = sorted.iter().map(|job| {
        
        let is_filtered_out = if !for_print && has_filters && !job.included_in_filters(&state.filters) { true } else { false };
        let is_paginated_out = if !for_print && !job.included_in_page(&curr_chunk) { true } else { false };

        // if  !for_print && has_filters && !job.included_in_filters(&state.filters) {

        //     return html!{
        //         <></>
        //     }
        // } else {
        //     anything_rendered = anything_rendered + 1
        // }

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
                is_filtered_out={ is_filtered_out }
                is_paginated_out={ is_paginated_out }
            />
        }
    }).collect::<Html>();

    let container_cname = if *active_job_id == 0 { "jobs-container" } else { "jobs-container with-selected" };

    html!{

        {
            // if anything_rendered == 0 {
            //     html!{ 
            //         <div class="StyledInlineWarning">
            //             <p>{ "No Jobs found - it looks like all  might be filtered out!" }</p>
            //             <p>{ "Try removing some filters"}</p>
            //         </div>
            //     }
            // } else {
                html!{
                    <div class={ container_cname }>
                        <TabberComponent<JobModel>
                            items={ chunks }
                            page={ *page }
                            on_select_tab={ on_select_tab }
                            sectione_model_type={ ModelTypes::Job }
                        />
                        {
                            html!{ jobs_list }
                        }
                    </div>
                }
            // }
        }
    }
}


