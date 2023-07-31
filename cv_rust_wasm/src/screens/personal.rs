use std::collections::HashMap;

use itertools::Itertools;
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
        make_model::make_projects, 
        weight_techs::{
            techs_with_months_duration,
            tech_weight,
        },
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



#[function_component(PersonalComponent)]
pub fn personal() -> Html {

    let (state, dispatch) = use_store::<StoreApp>();
    let (ui_state, ui_dispatch) = use_store::<StoreUI>();

    let dispatcher = dispatch.clone();
    let settings_ui_dipatcher = ui_dispatch.clone();

    let m_hashes : &AppStaticDataHashes = &state.static_models.model_hashes; 
    let store_projects = m_hashes.projects.values().cloned().collect::<Vec<ProjectModel>>();
    let projects:UseStateHandle<Vec<ProjectModel>> = use_state(|| store_projects);
    
    let user:UseStateHandle<UserModel> = use_state(||  UserModel { _id: None, tok: None });

    let default_models = StaticModels::default();
    let app_static_models_hashes : UseStateHandle<AppStaticDataHashes> = use_state(|| default_models.model_hashes);
    
    let show_back_btn = ui_state.settings_ui || ui_state.sidebar_ui; 

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


    let weights = techs_with_months_duration(m_hashes.jobs.values().collect_vec(), m_hashes.projects.values().collect_vec());
    let mut weights_max = 0;

    for w in weights.values().collect_vec() {
        if *w > weights_max {
            weights_max = *w 
        }
    }

    let on_back = Callback::from( move |_uid: usize| {  
        info!("nothing to do here");
    });

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
                    <i class="fa fa-bars" aria-hidden="true" />
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
            <div class="page">
                {
                    unsafe {
                        if CV_APP_LOADED.unwrap() == false {
                            html!{
                                <h3>{ "Loading data please wait ......." }</h3>
                            }
                        } else {
                            html! {
                                <div class="jobs-container">
                                    <div class="StyledAboutContainer">
                                        <ul class="itemised">
                                            
                                            <li><strong>{"Daniele Longo"}</strong></li>
                                            <li><strong>{"danielelongo@hotmail.com"}</strong></li>
                                            <li><a href="https://github.com/dani-lo"><strong>{"github"}</strong></a></li>
                                            <li><a href="https://interactiveme.net"><strong>{"interactiveme.net"}</strong></a></li>
                                        </ul>
                                    </div>
                                    <div class="StyledAboutContainer">
                                        <h3>{ "Professional Qualities" }</h3>
                                        <p>{"I am an experienced developer, with a positive can do attitude. A good communicator with both technical and non-technical colleagues, I enjoy finding simple solutions to complex problems."}</p>
                                    </div>
                                    <div class="StyledAboutContainer">
                                        <h3>{ "Experience and team fit" }</h3>
                                        <p>{"A naturally respectful and approachable person, my extensive experience in working within different sized teams, management styles and work arrangements has given me a solid understanding of work processes and collaborative best practices across all aspects of the professional environment"}</p>
                                    </div>
                                    <div class="StyledAboutContainer">
                                        <h3>{ "Education" }</h3>
                                        <ul>
                                            <li class="itemised">{"Laurea in "}<strong>{"Scienze della Comunicazione "}</strong>{"at Universita degli studi di Siena - Bachelor’s Degree (BSc) equivalent in "}<strong>{"Media Studies"}</strong>{" at Siena University, Italy, First class honours (1st)."}</li>
                                        </ul>
                                    </div>
                                    <div class="StyledAboutContainer">
                                        <h3>{ "Personal Interests" }</h3>
                                        <ul>
                                            <li class="itemised list-item">{"Yoga, Meditation"}</li>
                                            <li class="itemised list-item">{"Traveling"}</li>
                                            <li class="itemised list-item">{"Books"}</li>
                                            <li class="itemised list-item">{"Cooking"}</li>
                                            <li class="itemised list-item">{"Indian Philosophy"}</li>
                                        </ul>
                                    </div>
                                    <div class="StyledAboutContainer">
                                        <h3>{ "Skills" }</h3>
                                        <p>
                                        {
                                            m_hashes.techs.values().map(|d| {

                                                let weighted_tech_range_result = tech_weight(d.uid, &weights, weights_max);
                                                let style_str = format!("display:inline-block;margin-left:4px;font-size:{}px;", weighted_tech_range_result);

                                                html!{ <span style={ style_str }>{ d.name.clone() }</span> } 
                                            }).collect::<Html>()
                                        }
                                        </p>
                                    </div>
                                </div>
                            }
                        }
                    }
                }    
            </div>
        </>       
    }
}