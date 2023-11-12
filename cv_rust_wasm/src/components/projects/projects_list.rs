use std::{collections::HashMap, cmp::Ordering};

use log::info;
use yew::{
    Html, 
    Properties, 
    Callback, 
    function_component, 
    html, 
    use_effect_with_deps, use_state,
};

use serde::{
    Deserialize, 
    Serialize
};
use yewdux::prelude::use_store;

use crate::appdata::stores::store_app_types::PendingStatus;
use crate::appdata::stores::store_app::StoreApp;
use crate::components::projects::project::ProjectComponent;
use crate::components::widget::tabber::TabberComponent;
use crate::models::{
    Model,
    ModelTypes,
    project_model::ProjectModel,
};
use crate::traits::can_filter::Filter;
use crate::traits::{
    can_annotate::Annotation,
    can_bookmark::Bookmark,
};
use crate::util::chunker::{chunker, page_from_chunk};
use crate::util::wasm_bridge::{
    scroll_to_slot,
    scroll_top,
};

#[derive(Properties, PartialEq)]
pub struct ProjectListProps {
   pub projects: Vec<ProjectModel>,
   pub on_select_project_detail:  Callback<usize>,
   pub active_project_id: usize,
}


#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct UrlParams {
    pub id: i32,
}

#[function_component(ProjectsListComponent)]
pub fn job_list(ProjectListProps { 
        projects, 
        on_select_project_detail, 
        active_project_id }: &ProjectListProps) -> Html {

    let (state, _dispatch) = use_store::<StoreApp>();
        
    let page = use_state(|| 0);

    let selected_id = *active_project_id;

    let notes: Vec<Annotation> = state.annotations.clone().to_vec();
    let bookmarks: Vec<Bookmark> = state.bookmarks.clone().to_vec();
    
    let has_project_bookmarks = bookmarks.iter().any(|b : &Bookmark| b.resource_type == ModelTypes::Project);

    let active_filters = state.filters.iter().filter(|f| 
        f.pending == PendingStatus::Void || 
        f.pending == PendingStatus::VoidThenEdited || 
        f.pending == PendingStatus::Added
    ).collect::<Vec<&Filter>>();

    let has_filters = active_filters.len() > 0;
    
    let mut anything_rendered = 0;

    use_effect_with_deps(move|_| {
        if selected_id > 0 {
            info!("SCROLLING TO SLOT {}", selected_id);
            scroll_to_slot(selected_id);
        } else {
            scroll_top();
        }
    }, ());

    // let mut sorted_projects = projects.clone();
    let c_projects = projects.clone();

    let chunks : Vec<Vec<ProjectModel>> = chunker(projects.clone(), 4);
    let curr_chunk = &chunks[*page];

    let active_project_id_c = active_project_id.clone();

    let p = page_from_chunk(c_projects, &active_project_id_c, 4);
    let c_page = page.clone();
    let c_c_page = page.clone();

    let on_select_tab = Callback::from( move |page_num: usize| {  

        if page_num != *c_c_page {
            c_c_page.set(page_num);
        }
    });

    use_effect_with_deps(move |_| {

        if active_project_id_c  != 0 {

            if p != *c_page {
                c_page.set(p);
            }
        }
    }, active_project_id.clone());

    
    // sorted_projects.sort_by(|a, b| {
    //     if a < b { Ordering::Less } 
    //     else if a > b { Ordering::Greater } 
    //     else { Ordering::Equal }
    // });

    let projects_list = curr_chunk.iter().map(|project| {
        
        if  has_filters && !project.included_in_filters(&state.filters) {
            return html!{
                <></>
            }
        } else {
            anything_rendered = anything_rendered + 1
        }

        notes.clone()
            .retain(|n: &Annotation| n.resource_id == project.uid && n.resource_type == ModelTypes::Job);
        
        let bookmark =  bookmarks
            .iter()
            .find(|n| {
                return n.resource_id == project.uid &&  n.resource_type == ModelTypes::Project && (n.pending == PendingStatus::Added || n.pending == PendingStatus::Void || n.pending == PendingStatus::VoidThenEdited)
            });
        
        html! {
            <ProjectComponent 
                on_select_project_detail={ on_select_project_detail } 
                project={ project.clone() }
                bookmarked={ has_project_bookmarks && bookmark.is_some() }
                selected={ *active_project_id == project.uid }
            />
        }
    }).collect::<Html>();

    let container_cname = if *active_project_id == 0 { "jobs-container" } else { "jobs-container with-selected" };

    html!{

        {
            if anything_rendered == 0 {
                html!{ 
                    <div class="StyledInlineWarning">
                        <p>{ "No Projects found - it looks like all  might be filtered out!" }</p>
                        <p>{ "Try removing some filters"}</p>
                    </div>
                }
            } else {
                html!{
                    <div class={ container_cname }>
                        <TabberComponent<ProjectModel>
                            items={ chunks }
                            page={ *page }
                            on_select_tab={ on_select_tab }
                        />
                        {
                            html!{ projects_list }
                        }
                    </div>
                }
            }
        }
    }
}


