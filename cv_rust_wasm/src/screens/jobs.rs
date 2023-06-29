use std::collections::HashMap;

use log::info;
use yew::{
    prelude::*, 
};

use yewdux::prelude::*;

use yew_router::{history::{
    BrowserHistory, 
    History
}, prelude::{use_navigator, use_location}};

use crate::{
    models::{
        job_model::{ 
            JobModel, 
            JobData ,
        }, 
        user_model::{UserModel, get_user},
    },
    api::{
        actions_api_func::get_user_actions,
        static_api_func::{
            get_static_data_hash,
            load_jobs,
        }, 
    },
    appdata::stores::{
        store_app::StoreApp,
        store_app_types:: { 
            AppStaticDataHashes, 
            Collectable
        }, store_ui::StoreUI,
    }, 
    components::{
        appmenu::AppMenuComponent,
        modals::ActionsModalComponent,
        actions::{
            actions_list::ActionsListComponent,
        },
        jobs::{ 
            jobs_list::JobsListComponent,
            job_detail::JobDetailComponent,
        },
        widget::settings::ConfigSettingsListComponent,
    },
    traits::ActionTypes, 
    util::{
        make_model::make_jobs,
        url_query_params::get_query_params, 
    },
    CV_APP_LOADED, routes::AppRoute,

};

#[derive(Properties, PartialEq)]
pub struct JobsProps {
    pub route_id: Option<usize>,
}

#[function_component(JobsComponent)]
pub fn jobs(JobsProps { route_id } : &JobsProps) -> Html {

    let (state, dispatch) = use_store::<StoreApp>();
    let (_ui_state, ui_dispatch) = use_store::<StoreUI>();

    let nav = use_navigator().unwrap();

    // let settings_list = use_state(|| false);
    let user:UseStateHandle<UserModel> = use_state(||  UserModel { _id: None, tok: None });

    let dispatcher = dispatch.clone();
    let settings_ui_dipatcher = ui_dispatch.clone();

    // let nav_location = BrowserHistory::new().location();
    // let query_st = nav_location.query_str();
    // let maybe_appquery = get_query_params(query_st);

    let m_hashes : &AppStaticDataHashes = &state.static_models.model_hashes; 

    let jobs:UseStateHandle<Vec<JobModel>> = use_state(||  {
        m_hashes.jobs.values().cloned().collect::<Vec<JobModel>>()
    });

    // let selected_job_uid: UseStateHandle<Option<usize>> = use_state(|| {
    //     if maybe_appquery.is_some() { 
    //         Some(maybe_appquery.unwrap().uid) 
    //     } else { 
    //         None 
    //     }
    // });

    // let c_selected_job_uid = selected_job_uid.clone();
    
    let on_select_job_detail = Callback::from( move |uid: usize| {  

        nav.push(&AppRoute::JobsDetailRoute { uid });
    });

    unsafe {
        let jobs:UseStateHandle<Vec<JobModel>> = jobs.clone();
        
        let loading_futures_spawn = async move {

            let fetched_jobs: Vec<JobData> = load_jobs().await;
            let fetched_static_data_models_hashes : AppStaticDataHashes = get_static_data_hash().await;
            let fetched_user_actions : HashMap<ActionTypes, Vec<Collectable>> = get_user_actions().await;

            let loaded_user = get_user().await;

            user.set(loaded_user.unwrap());

            let made_jobs: Vec<JobModel> = make_jobs(
                fetched_jobs, 
                &fetched_static_data_models_hashes.companies, 
                &fetched_static_data_models_hashes.techs, 
                &fetched_static_data_models_hashes.jobtypes
            );

            jobs.set(made_jobs);

            dispatcher.reduce_mut(|s| s.set_static_models(fetched_static_data_models_hashes));
            dispatcher.reduce_mut(|s| s.init_user_actions(fetched_user_actions));

            CV_APP_LOADED = Some(true);
        };

        use_effect_with_deps(move |_| {

            if CV_APP_LOADED.unwrap() == false {
                wasm_bindgen_futures::spawn_local(loading_futures_spawn);
            }

            || ()
        }, ());
    }

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
                                <ActionsListComponent 

                                />
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
                                    <JobsListComponent
                                        jobs={(*jobs).clone()} 
                                        on_select_job_detail={ on_select_job_detail }
                                        active_job_id={ if route_id.is_some() { route_id.unwrap() } else { 0 }  }
                                    />
                                }
                            }
                        }
                    }
                </div>
                <div>
                    <JobDetailComponent
                        selected_job_uid={ route_id }
                    />
                </div>
            </div> 
        </div>       
    }
}