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
        url_query_params::get_query_params, wasm_bridge, 
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
    let (ui_state, ui_dispatch) = use_store::<StoreUI>();

    let payoff_ui_dipatcher = ui_dispatch.clone();

    let nav = use_navigator().unwrap();
    let nav_back = nav.clone();

    let user:UseStateHandle<UserModel> = use_state(||  UserModel { _id: None, tok: None });

    let dispatcher = dispatch.clone();
    let settings_ui_dipatcher = ui_dispatch.clone();

    let m_hashes : &AppStaticDataHashes = &state.static_models.model_hashes; 

    let jobs:UseStateHandle<Vec<JobModel>> = use_state(||  {
        m_hashes.jobs.values().cloned().collect::<Vec<JobModel>>()
    });
    
    let on_select_job_detail = Callback::from( move |uid: usize| {  

        nav.push(&AppRoute::JobsDetailRoute { uid });
    });

    let on_back = Callback::from( move |_uid: usize| {  

        nav_back.push(&AppRoute::JobsRoute {});
    });

    let nav_location = BrowserHistory::new().location();
    let query_st = nav_location.path();
    let pos = query_st.rfind("/").unwrap();

    let show_back_btn = pos > 0 || ui_state.settings_ui || ui_state.sidebar_ui; 

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
            <ConfigSettingsListComponent />
            <ActionsModalComponent />
            <TopbarComponent 
                on_back={ on_back } 
                show_back_btn={ show_back_btn }
            />
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
                                <JobsListComponent
                                    jobs={(*jobs).clone()} 
                                    on_select_job_detail={ on_select_job_detail }
                                    active_job_id={ if route_id.is_some() { route_id.unwrap() } else { 0 }  }
                                    for_print={ false }
                                />
                            }
                        }
                    }
                }
                <JobDetailComponent
                    selected_job_uid={ route_id }
                />
            </div> 
        </>       
    }
}