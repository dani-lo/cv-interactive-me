use std::collections::HashMap;
use wasm_bindgen_futures::spawn_local;
use yew::{
    prelude::*, 
};
use yew_router::prelude::*;
use yewdux::prelude::use_store;
// use gloo_timers::callback::Timeout;


mod models;
mod appdata;
mod api;
mod components;
mod util;
mod libstyled;
mod routes;
mod traits;
mod screens;

use crate::{
    traits::ActionTypes, 
    api::actions_api_func::persist_appstate_pending,
    appdata::stores::{
        store_app_types::Collectable, 
        store_app::StoreApp, 
        store_ui::StoreUI,
    }, 
    models::user_model::{
        UserModel, 
        get_user,
    },
    screens::{
        jobs::JobsComponent,
        projects::ProjectsComponent,
    },
    util::store_utils::state_pending_actions,
};

use routes::AppRoute;

static mut CV_APP_LOADED: Option<bool> = Some(false);

pub struct EmptyVoid {}

#[function_component(App)]
fn app() -> Html {
    
    // info!("{:?}", std::env::args());

    let (ui_state, _ui_dispatch) = use_store::<StoreUI>();

    let ui_busy = ui_state.busy;
    let ui_msg = ui_state.msg;

    fn switch(routes: AppRoute) -> Html {
         
        match routes {
            AppRoute::HomeRoute => html! { <h1>{ "Home" }</h1> },
            AppRoute::JobsRoute => html! { <JobsComponent route_id={ 0 } /> },
            AppRoute::JobsDetailRoute { uid } => html! { <JobsComponent route_id={ uid } /> },            
            AppRoute::ProjectsRoute => html! {<ProjectsComponent route_id={ 0 } /> },
            AppRoute::PersonalRoute => html! { <h1>{ "This is Personal" }</h1> },
            AppRoute::NotFoundRoute => html! { <h1>{ "404" }</h1> },
        }
    }

    html! {
        <div>
            <PendingActionsComponent />
            { 
                if ui_busy {
                    html!{
                        <div class="StyledLoaderRipple">
                            <div class="bg"></div>
                            <div>
                                <div></div>
                                <div></div>
                            </div>
                            {
                                if ui_msg.len() > 0 {
                                    html!{
                                        <p><span>{ ui_msg }</span></p>
                                    } 
                                } else { 
                                    html!{ <></>}
                                }
                            }
                        </div>
                    }
                } else {
                    html!{ <></>}
                }
            }
            <BrowserRouter>
                <Switch<AppRoute> render={switch} />
            </BrowserRouter>
        </div>
    }
}

fn main() {
    wasm_logger::init(wasm_logger::Config::default());
    
    yew::Renderer::<App>::new().render();
}

#[function_component(PendingActionsComponent)]
pub fn pending_actions_component() -> Html {

    let (state, dispatch) = use_store::<StoreApp>();
    let (ui_state, ui_dispatch) = use_store::<StoreUI>();
    
    let c_state = (*state).clone();

    let user = use_state(|| UserModel { _id: None, tok: None });
    let c_user = user.clone();

    use_effect_with_deps( move |_| {
        if c_user._id.is_none() {

            wasm_bindgen_futures::spawn_local(async move {

                let loaded_user = get_user().await;
        
                c_user.set(loaded_user.unwrap());
            });
        }
        || ()
    }, ());

    let user_opts: UseStateHandle<bool> = use_state(|| false);
    let ban_persist_tmp: UseStateHandle<bool> = use_state(|| false);
    let ban_persist_always: UseStateHandle<bool> = use_state(|| false);

    let c_ban_persist_always = ban_persist_always.clone();
    let c_ban_persist_tmp = ban_persist_tmp.clone();

    let flush_dispatcher = dispatch.clone();
    
    let all_pending = state_pending_actions(state);
    let all_pending_len = all_pending.len();

    let discard_pending: Callback<Option<yew::UiEvent>> = Callback::from(move |_e| {
        flush_dispatcher.reduce_mut(|s| s.flush_pending());
    });

    let apply_pending : Callback<Option<yew::UiEvent>> = Callback::from(move |_e| {

        let mut c_pending_annotations_collectables = all_pending.clone();
        let mut c_pending_bookmarks_collectables = all_pending.clone();
        let mut c_pending_filters_collectables = all_pending.clone();
        
        c_pending_annotations_collectables.retain(|p| p.action_type == Some(ActionTypes::ANNOTATION));
        c_pending_bookmarks_collectables.retain(|p| p.action_type == Some(ActionTypes::BOOKMARK));
        c_pending_filters_collectables.retain(|p| p.action_type == Some(ActionTypes::FILTER));

        let apply_dispatcher = dispatch.clone();
        
        let c_c_state = c_state.clone();

        spawn_local(async move {

            let persist_result: HashMap<ActionTypes, Vec<Collectable>> = persist_appstate_pending(
                c_pending_annotations_collectables, 
                c_pending_bookmarks_collectables, 
                c_pending_filters_collectables,
                c_c_state
            ).await;

            apply_dispatcher.reduce_mut(|s| s.apply_processed_pending(persist_result));
        });
    });
    
    let c_user_opts = user_opts.clone();
    
    let on_click_show_hide_opts : yew::Callback<std::option::Option<EmptyVoid>>= Callback::from(move |_: Option<EmptyVoid>| c_user_opts.set(!*c_user_opts));

    html!{
        <div class={ if all_pending_len > 0 { "StyledPrompt active" } else { "StyledPrompt" } }>
            <div class="prompt">
                <p><strong>{"You have "} { all_pending_len } {"pending changes"}</strong></p>
                <button 
                    class="danger"
                    onclick={ move |_| discard_pending.emit(None) }
                >{"Discard"}</button>
                <button
                    class="ok"
                    onclick={ move |_| apply_pending.emit(None) }
                >{"Apply"}</button>
            </div>
            <p class="actionable" onclick={ move |_| on_click_show_hide_opts.emit(None) }>
                {
                    if *user_opts {
                    html!{ <i class="fa fa-chevron-down" />}
                    } else {
                        html!{<i class="fa fa-chevron-right" />}
                    }
                }
                <span>{"Why am I seeing this?"}</span>
            </p>
            {
                if *user_opts {
                    html!{
                    <div>
                        <div class="pending-actions-user-info">
                            <p>
                                {"This app tracks users by assigning a "}
                                <strong>{"random identifier"}</strong>
                                { " stored in session. 
                                If you would like to persist your actions (i.e filters, bookmrks, annotations) you can do so: after
                                persisting, your browser in future will automatically show your saved actions." }
                                <br />
                                {"You can also use the thus stored random identifier to access your actions from a different broswer, i.e "}
                                <strong>{"sharing"}</strong> 
                                {"your filters etc with colleagues"}
                                </p>
                        </div>
                        <div class="pending-actions-user-opts">
                            <p><strong>{"Do not show this again"}</strong></p>
                            <div class="StyledInputContainer pending-actions-user-opt">
                                <input type="checkbox" name="ban_persist_always" onclick={ Callback::from(move |e| { c_ban_persist_always.set(!*c_ban_persist_always) })} />
                                <label>{"Ever"}</label>
                            </div>
                            <div class="StyledInputContainer pending-actions-user-opt">
                                <input type="checkbox" name="ban_persist_tmp"  onclick={ Callback::from(move |e| { c_ban_persist_tmp.set(!*c_ban_persist_tmp) })} />
                                <label>{"For the duration of this session"}</label>
                            </div>
                            <div class="StyledInputContainer pending-actions-user-opt">
                                <button onclick={ move |_e|{

                                    if *ban_persist_always {
    
                                        UserModel::store_ban_trackig_feeback();
                                        ui_dispatch.reduce_mut(|s| s.notify("All Done"));

                                    } else if *ban_persist_tmp {

                                        ui_dispatch.reduce_mut(|s| {
                                            s.ban_feedback_tmp();
                                            s.notify("All Done");
                                    });

                                    }
                                } }>{"Ok"}</button>
                            </div>
                        </div>
                    </div>
                    }
                } else {
                    html!{<></>}
                }
            }
        </div>
    }
}
