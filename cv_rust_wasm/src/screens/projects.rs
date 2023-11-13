use std::collections::HashMap;

use log::info;
use yew::{
    prelude::*, 
};

use yew_router::{history::{
    BrowserHistory, 
    History
}, prelude::use_navigator};
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
        actions::actions_list::ActionsListComponent,
        projects::{
            projects_list::ProjectsListComponent,
            project_detail::ProjectDetailComponent,
        },
        widget::{
            settings::ConfigSettingsListComponent,
            topbar::TopbarComponent,
        },
    },
    CV_APP_LOADED, routes::AppRoute,
};

#[derive(Properties, PartialEq)]
pub struct ProjectsProps {
    pub route_id: Option<usize>,
}

#[function_component(ProjectsComponent)]
pub fn projects(ProjectsProps { route_id} : &ProjectsProps) -> Html {

    let (state, dispatch) = use_store::<StoreApp>();
    let (ui_state, ui_dispatch) = use_store::<StoreUI>();

    let payoff_ui_dipatcher = ui_dispatch.clone();

    let dispatcher = dispatch.clone();
    let settings_ui_dipatcher = ui_dispatch.clone();

    let nav = use_navigator().unwrap();
    let nav_back = nav.clone();

    let m_hashes : &AppStaticDataHashes = &state.static_models.model_hashes; 
    let store_projects = m_hashes.projects.values().cloned().collect::<Vec<ProjectModel>>();
    let projects:UseStateHandle<Vec<ProjectModel>> = use_state(|| store_projects);
    
    let user:UseStateHandle<UserModel> = use_state(||  UserModel { _id: None, tok: None });

    let default_models = StaticModels::default();
    let app_static_models_hashes : UseStateHandle<AppStaticDataHashes> = use_state(|| default_models.model_hashes);

    let on_select_project_detail = Callback::from( move |uid: usize| {
        nav.push(&AppRoute::ProjectsDetailRoute { uid });
    });
    
    let on_back = Callback::from( move |_uid: usize| {  
        nav_back.push(&AppRoute::ProjectsRoute {});
    });

    let nav_location = BrowserHistory::new().location();
    let query_st = nav_location.path();
    let pos = query_st.rfind("/").unwrap();

    let show_back_btn = pos > 0;// || ui_state.settings_ui || ui_state.sidebar_ui; 

    unsafe {
        let projects:UseStateHandle<Vec<ProjectModel>> = projects.clone();

        let loading_future_spawn = async move {

            let fetched_projects: Vec<ProjectData> = load_projects().await;
            let fetched_user_actions : HashMap <ActionTypes, Vec<Collectable>> = get_user_actions().await;            
            let fetched_static_data_models_hashes : AppStaticDataHashes = get_static_data_hash().await;
            
            let loaded_user = get_user().await;

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

    html! {
        <>  
            <ConfigSettingsListComponent />
            <TopbarComponent 
                show_back_btn={ show_back_btn }
                on_back={ on_back } 
            />
            <ActionsModalComponent />
            <div class={ if ui_state.sidebar_ui { "StyledSidebar active" } else { "StyledSidebar" } }>
                <span 
                    class="html-icon"
                    onclick={ move |_| settings_ui_dipatcher.reduce_mut(|s| s.toggle_settings_ui()) }>
                    <i class="fa fa-cog" aria-hidden="true" />
                </span> 
                <h1 class="app-logo"><a href="https://interactiveme.net/">{ "Interactive Me" }</a></h1>
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
                {
                    if ui_state.payoff_ui { 
                        html!{
                            <div class="StyledAppPayoff">  
                                <div>
                                    <span 
                                        class="html-icon"
                                        onclick={ move |_| payoff_ui_dipatcher.reduce_mut(|s| s.hide_payoff_ui()) }>
                                            <i aria-hidden="true" class="fa fa-times" />
                                    </span>
                                    <p>
                                        {
                                            "You are viewing the Web Asssembly (Rust) implemntation."
                                        }
                                    </p>
                                    <p>
                                        {
                                            "Try the "
                                        }
                                        <a href="https://nextjs.interactiveme.net/personal">
                                        {
                                            "Nextjs implementation"
                                        }
                                        </a>
                                    </p>
                                </div>
                            </div>
                        }
                    } else {
                        html!{ <></> }
                    }
                } 
            </div>
            <div class="page">
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
                                    active_project_id={ if route_id.is_some() { route_id.unwrap() } else { 0 }  }
                                />
                            }
                        }
                    }
                }
                <ProjectDetailComponent
                    selected_project_uid={ route_id }
                />
            </div>
        </>       
    }
}