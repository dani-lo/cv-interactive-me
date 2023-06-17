use std::collections::HashMap;

use log::info;
use yew::{
    prelude::*, 
};

use yew_router::history::{
    BrowserHistory, 
    History
};
use yewdux::prelude::use_store;

use crate::{
    api::{
        static_api_func::{
            get_static_data_hash,
            load_projects,
        }, 
        actions_api_func::get_user_actions,
    },
    appdata::stores::{
        store_app_types:: { 
            StaticModels, 
            AppStaticDataHashes, 
            Collectable
        }, 
        store_app::StoreApp, store_ui::StoreUI, 
        
    }, 
    traits::ActionTypes, 
    util::{
        url_query_params::get_query_params, 
        make_model::make_projects,
    }, 
    models::{
        project_model::{
            ProjectModel, 
            ProjectData,
        },
         user_model::{
            UserModel, 
            get_user,
        }
    }, 
    components::{
        appmenu::AppMenuComponent,
        modals::ActionsModalComponent,
        actions::{
            actions_list::ActionsListComponent,
        },
        projects::{
            projects_list::ProjectsListComponent,
            project_detail::ProjectDetailComponent,
        },
        widget::settings::ConfigSettingsListComponent,
    },
    CV_APP_LOADED,
};

#[derive(Properties, PartialEq)]
pub struct JobsProps {
    pub route_id: usize,
}

#[function_component(ProjectsComponent)]
pub fn jobs(JobsProps { route_id} : &JobsProps) -> Html {

    let (state, dispatch) = use_store::<StoreApp>();
    let (_ui_state, ui_dispatch) = use_store::<StoreUI>();

    let dispatcher = dispatch.clone();
    let settings_ui_dipatcher = ui_dispatch.clone();

    let m_hashes : &AppStaticDataHashes = &state.static_models.model_hashes; 
    let store_projects = m_hashes.projects.values().cloned().collect::<Vec<ProjectModel>>();
    let projects:UseStateHandle<Vec<ProjectModel>> = use_state(|| store_projects);
    
    let user:UseStateHandle<UserModel> = use_state(||  UserModel { _id: None, tok: None });

    let nav_location = BrowserHistory::new().location();
    let query_st = nav_location.query_str();
    let maybe_appquery = get_query_params(query_st);

    let selected_project_uid: UseStateHandle<Option<usize>> = use_state(|| if maybe_appquery.is_some() { Some(maybe_appquery.unwrap().uid) } else { None });
    let c_selected_project_uid = selected_project_uid.clone();

    let default_models = StaticModels::default();
    let app_static_models_hashes : UseStateHandle<AppStaticDataHashes> = use_state(|| default_models.model_hashes);

    let on_select_project_detail = Callback::from( move |uid: usize| {
        selected_project_uid.set(Some(uid));
    });
    
    unsafe {
        let projects:UseStateHandle<Vec<ProjectModel>> = projects.clone();

        let loading_future_spawn = async move {

            let fetched_projects: Vec<ProjectData> = load_projects().await;
            let fetched_user_actions : HashMap <ActionTypes, Vec<Collectable>> = get_user_actions().await;            
            let fetched_static_data_models_hashes : AppStaticDataHashes = get_static_data_hash().await;
            
            let loaded_user = get_user().await;

            // info!("Fetched in Projects screen:::");
            // info!("{:?}", fetched_projects);

            user.set(loaded_user.unwrap());

            let made_projects: Vec<ProjectModel> = make_projects(
                fetched_projects, 
                &fetched_static_data_models_hashes.techs, 
            );

            projects.set(made_projects);
            
            app_static_models_hashes.set(fetched_static_data_models_hashes.clone());

            dispatcher.reduce_mut(|s| s.set_static_models(fetched_static_data_models_hashes));
            dispatcher.reduce_mut(|s| s.init_user_actions(fetched_user_actions));

            CV_APP_LOADED = Some(true);
        };

        use_effect_with_deps( move |_| {
            
            if CV_APP_LOADED.unwrap() == false {
                wasm_bindgen_futures::spawn_local(loading_future_spawn);
            }

            || ()
        }, ());
    }

    // info!("Projects FROM state in proj scren >>>>");
    // info!("{:?}", projects);

    html! {
        <div class="page">  
            <ConfigSettingsListComponent />
            <ActionsModalComponent />
            <div class="StyledSidebar">
                <span 
                    class="html-icon"
                    onclick={ move |_| settings_ui_dipatcher.reduce_mut(|s| s.toggle_settings_ui()) }>
                        {  	"\u{2630}" }
                </span> 
            <h1 class="app-logo">{ "Curriculum Vitae" }</h1>
                <AppMenuComponent />
                {
                    unsafe {
                        if CV_APP_LOADED.unwrap() == false {
                            html!{
                                <h3>{ "Loading data please wait ......." }</h3>
                            }
                        } else {
                            html!{
                                <ActionsListComponent />
                            }
                        }
                    }   
                    
                }  
            </div>
            <div class="page-grid">
                <div>
                    
                    {
                        unsafe {
                            if CV_APP_LOADED.unwrap() == false {
                                html!{
                                    <h3>{ "Loading data please wait ......." }</h3>
                                }
                            } else {
                                html!{
                                    <ProjectsListComponent
                                        projects={(*projects).clone()} 
                                        on_select_project_detail={ on_select_project_detail }
                                        active_project_id={ if c_selected_project_uid.is_some() { c_selected_project_uid.unwrap() } else { 0 }  }
                                    />
                                }
                            }
                        }
                    } 
                    
                </div>
                <div>
                    <ProjectDetailComponent
                        selected_project_uid={ c_selected_project_uid }
                    />
                </div>
            </div> 
        </div>       
    }
}