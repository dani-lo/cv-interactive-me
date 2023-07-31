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
        widget::{
            settings::ConfigSettingsListComponent,
            topbar::TopbarComponent,
        },
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

#[function_component(PrintComponent)]
pub fn print_screen() -> Html {

    let (state, dispatch) = use_store::<StoreApp>();
    let (ui_state, ui_dispatch) = use_store::<StoreUI>();

    let nav = use_navigator().unwrap();
    let nav_back = nav.clone();

    let user:UseStateHandle<UserModel> = use_state(||  UserModel { _id: None, tok: None });

    let dispatcher = dispatch.clone();

    let m_hashes : &AppStaticDataHashes = &state.static_models.model_hashes; 

    let jobs:UseStateHandle<Vec<JobModel>> = use_state(||  {
        m_hashes.jobs.values().cloned().collect::<Vec<JobModel>>()
    });
    
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
        <>  
            <div class="print">
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
                                    active_job_id={ 0 }
                                    for_print={ true }
                                />
                            }
                        }
                    }
                }
            </div> 
        </>       
    }
}