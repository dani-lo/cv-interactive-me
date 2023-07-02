use std::collections::HashMap;
use wasm_bindgen_futures::spawn_local;
use yew::{
    prelude::*, 
};
use yewdux::prelude::use_store;

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
        get_user
    },
    util::{store_utils::state_pending_actions, wasm_bridge::notify_user},
};

pub struct EmptyVoid {}

#[function_component(PendingActionsComponent)]
pub fn pending_actions_component() -> Html {

    let (state, dispatch) = use_store::<StoreApp>();
    let (yew_routerui_state, ui_dispatch) = use_store::<StoreUI>();

    let settings_ui_dipatcher = ui_dispatch.clone();
    
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

    let flush_dispatcher = dispatch.clone();
    
    let all_pending = state_pending_actions(state);
    let all_pending_len = all_pending.len();

    let discard_pending: Callback<Option<yew::UiEvent>> = Callback::from(move |_e| {
        flush_dispatcher.reduce_mut(|s| s.flush_pending());

        notify_user("Your changes have ben discarded", true);
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

            notify_user("Your changes have ben persisted", true);
        });
    });
    
    let c_user_opts = user_opts.clone();
    
    let on_click_show_hide_opts : yew::Callback<std::option::Option<EmptyVoid>>= Callback::from(move |_: Option<EmptyVoid>| c_user_opts.set(!*c_user_opts));

    html!{
        <div class={ if all_pending_len > 0 { "StyledPrompt active" } else { "StyledPrompt" } }>
            <div class="prompt">
                <p>
                    <strong>
                        {"You have "} { all_pending_len } {"pending changes"}
                    </strong>
                </p>
                <button 
                    class="err"
                    onclick={ move |_| discard_pending.emit(None) }
                >
                    {"Discard"}
                </button>
                <button
                    class="ok"
                    onclick={ move |_| apply_pending.emit(None) }
                >
                    {"Persist"}
                </button>
            </div>
            <p onclick={ move |_| on_click_show_hide_opts.emit(None) }>
                {
                    if *user_opts {
                        html!{ <i class="fa fa-chevron-down fw" />}
                    } else {
                        html!{<i class="fa fa-chevron-right fw" />}
                    }
                }
                <a>{"Why am I seeing this?"}</a>
            </p>
            {
                if *user_opts {
                    html!{
                    <div>
                        <div class="pending-actions-user-info">
                            <p>
                                {"This app tracks users by assigning a "}
                                <strong>
                                    {"random identifier"}
                                </strong>
                                    { " stored in session. 
                                    If you would like to persist your actions (i.e filters, bookmrks, annotations) you can do so: after
                                    persisting, your browser in future will automatically show your saved actions." }
                                <br />
                                {"You can also use the thus stored random identifier to access your actions from a different broswer, i.e "}
                                    <strong>
                                        {"sharing"}
                                    </strong> 
                                {"your filters, notes and bookmarks with colleagues"}
                                </p>
                                <p>
                                    { "You can fine tune how this app persists your dataur active to, and you active token,  by editing the app settings." }
                                </p>
                        </div>
                        <button 
                            style="display: flex;"
                            class="margin-b"
                            onclick={ move |_| settings_ui_dipatcher.reduce_mut(|s| s.toggle_settings_ui()) }
                        >
                            { "Edit settings" }
                        </button>
                    </div>
                    }
                } else {
                    html!{<></>}
                }
            }
        </div>
    }
}

