use std::collections::HashMap;
use log::info;
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
    util::{
        store_utils::state_pending_actions, 
        wasm_bridge::notify_user,
    },
    settings::ConfigKeys,
};

pub struct EmptyVoid {}

#[function_component(PendingActionsComponent)]
pub fn pending_actions_component() -> Html {

    let (state, dispatch) = use_store::<StoreApp>();
    let (ui_state, ui_dispatch) = use_store::<StoreUI>();

    let user = use_state(|| UserModel { _id: None, tok: None });
    let show_self = use_state(|| true);

    let show_self_callback = show_self.clone();
    let show_self_effect = show_self.clone();
    let show_self_edit = show_self.clone();

    let c_user = user.clone();

    use_effect_with_deps( move |_| {
        if c_user._id.is_none() {

            wasm_bindgen_futures::spawn_local(async move {

                let loaded_user = get_user().await;
                
                if loaded_user.is_some() {
                    c_user.set(loaded_user.unwrap());
                }
            });
        }
        || ()
    }, ());

    let all_pending = state_pending_actions(state);

    use_effect_with_deps( move |_| {

        show_self_effect.set(true);

        || ()
    }, all_pending.clone());

    let user_opts: UseStateHandle<bool> = use_state(|| false);

    let show_persist_feedbak_opt = ui_state.settings.get_config_setting_value(&ConfigKeys::ShowPersistFeedback);
    let auto_persist_opt = ui_state.settings.get_config_setting_value(&ConfigKeys::AutoPersist);
    
    let show_persist_feedbak = show_persist_feedbak_opt.unwrap();
    let auto_persist = auto_persist_opt.unwrap();

    let settings_ui_dipatcher = ui_dispatch.clone();
    let flush_dispatcher = dispatch.clone();
    
    let all_pending_len = all_pending.len();

    let discard_pending: Callback<Option<yew::UiEvent>> = Callback::from(move |_e| {
        flush_dispatcher.reduce_mut(|s| s.flush_pending());

        notify_user("Your changes have ben discarded", true);
    });
    
    let panel_classname = if (show_persist_feedbak || auto_persist) && all_pending_len > 0 && *show_self  { "StyledPrompt active" } else { "StyledPrompt" };

    let apply_pending : Callback<Option<yew::UiEvent>> = Callback::from(move |_e| {

        let mut c_pending_annotations_collectables = all_pending.clone();
        let mut c_pending_bookmarks_collectables = all_pending.clone();
        let mut c_pending_filters_collectables = all_pending.clone();
        
        c_pending_annotations_collectables.retain(|p| p.action_type == Some(ActionTypes::ANNOTATION));
        c_pending_bookmarks_collectables.retain(|p| p.action_type == Some(ActionTypes::BOOKMARK));
        c_pending_filters_collectables.retain(|p| p.action_type == Some(ActionTypes::FILTER));

        let apply_dispatcher = dispatch.clone();
        
        spawn_local(async move {

            let persist_result: HashMap<ActionTypes, Vec<Collectable>> = persist_appstate_pending(
                c_pending_annotations_collectables, 
                c_pending_bookmarks_collectables, 
                c_pending_filters_collectables
            ).await;

            apply_dispatcher.reduce_mut(|s| s.apply_processed_pending(persist_result));

            notify_user("Your changes have ben persisted", true);
        });
    });
    
    let c_user_opts = user_opts.clone();
    
    let on_click_show_hide_opts : yew::Callback<std::option::Option<EmptyVoid>>= Callback::from(move |_: Option<EmptyVoid>| c_user_opts.set(!*c_user_opts));

    if auto_persist && all_pending_len > 0 {
        apply_pending.emit(None);
    }

    html!{
        <div class={ panel_classname }>
            <span class="html-icon" onclick={ move |_| show_self_callback.set(false) }>
                <i aria-hidden="true" class="fa fa-times" />
            </span>
            <div class="prompt">
                <p>
                    <strong>
                        {"You have "} { all_pending_len } { if all_pending_len == 1 { " pending change" } else { " pending changes" }}
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
                            style="display: flex;margin-top: var(--gap-large);"
                            onclick={ move |_| {
                                show_self_edit.set(false);
                                settings_ui_dipatcher.reduce_mut(|s| s.toggle_settings_ui()) 
                            }}
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

