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

use crate::appdata::stores::store_app_types::PendingStatus;
use crate::appdata::stores::store_app::StoreApp;
use crate::components::projects::project::ProjectComponent;
use crate::models::{
    ModelTypes,
    project_model::ProjectModel,
};
use crate::traits::{
    can_annotate::Annotation,
    can_bookmark::Bookmark,
};

#[derive(Properties, PartialEq)]
pub struct ProjectListProps {
   pub projects: Vec<ProjectModel>,
   pub on_select_project_detail:  Callback<usize>,
//    pub set_modal_item: Callback<Actionable>,
//    pub store: UseReducerHandle<StoreState>,
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
    
    let mut c_projects = projects.clone();

    // info!("{:?}", store);
    let notes: Vec<Annotation> = state.annotations.clone().to_vec();
    let bookmarks: Vec<Bookmark> = state.bookmarks.clone().to_vec();
    
    let has_project_bookmarks = bookmarks.iter().any(|b : &Bookmark| b.resource_type == ModelTypes::Project);
    
    c_projects.sort_by(|a, b| if a.uid > b.uid { std::cmp::Ordering::Greater } else { std::cmp::Ordering::Less });

    c_projects.iter().map(|project| {
        
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
    }).collect()
}


