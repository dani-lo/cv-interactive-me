use std::collections::HashMap;

use log::info;

use yew::prelude::*;

use web_sys::HtmlInputElement;
use yew::events::InputEvent;

use yewdux::prelude::{use_store, Dispatch};

use crate::{
    api::actions_api_func::get_user_actions,
    appdata::stores::{
        store_ui::StoreUI, 
        store_app_types::Collectable, store_app::StoreApp,
    },
    settings::{
        ConfigKeys, 
        ConfigItem,
    },
    models::{
        user_model::UserModel,
    }, traits::ActionTypes
};

#[function_component(ConfigSettingsListComponent)]
pub fn config_settings() -> Html {    
   
    let (ui_state, dispatch) = use_store::<StoreUI>();

    let settings_ui_dipatcher = dispatch.clone();

    let settings_items = &ui_state.settings.items;
    let mut s_keys : Vec<ConfigKeys>= Vec::new();

    for (k, v) in settings_items {
        s_keys.push(k.clone());
    } 

    let elements = s_keys.iter().map(|setting_key| {
                            
        let config_setting = settings_items.get(&setting_key).unwrap().clone();

        html!{

            <ConfigSettingComponent
                setting={ config_setting }
                dispatch={ dispatch.clone() }
                setting_key={ setting_key.clone() }
            />
        }
    }).collect::<Html>();

    let c_name = if ui_state.settings_ui { "StyledSettingsListContainer" } else { "StyledSettingsListContainer disabled" };

    html!{  
        <>
            { 
                if ui_state.settings_ui {
                    html!{
                        <div class="generic-ui-overlay-bg"></div>
                    }
                } else {
                    html!{ 
                        <></> 
                    }
                }
                
            }
            <div class={ c_name }>
                <span  
                    class="html-icon" 
                    onclick={ move |_| settings_ui_dipatcher.reduce_mut(|s| s.toggle_settings_ui()) }>
                    <i class="fa fa-arrow-left" aria-hidden="true" />
                </span> 
                {
                    elements
                }
                <TokSettingComponent 
                    dispatch={ dispatch.clone() }
                />
            </div>
        </>
    }
}

#[derive(PartialEq, Properties)]
pub struct SettingProps {
    setting: ConfigItem,
    setting_key: ConfigKeys,
    dispatch: Dispatch<StoreUI>,
}

#[function_component(ConfigSettingComponent)]
pub fn config_settings(SettingProps { setting, dispatch, setting_key } : &SettingProps) -> Html {    

    let dispatcher = dispatch.clone();
    
    let val_opt: Option<bool> = setting.val;
    
    if val_opt.is_none() {
        return html!{<></>};
    }

    let val = val_opt.unwrap();
    let checked_state = use_state(|| val);

    let save_class = if (*checked_state) == val { "disabled" } else { "" };
    let next_checked_state = if val == true { false } else { true };

    let cloned_key = setting_key.clone();

    html!{
        <div>    
            <input 
                type="checkbox" 
                checked={ *checked_state }
                onchange={ move |_| checked_state.set(!(*checked_state)) }
            />
            <label>{ &setting.label }</label>
            <p>{ &setting.desc }</p>
            <button 
                class={ save_class }
                onclick={ move |_| dispatcher.reduce_mut(|s| s.set_config(
                        &cloned_key,
                        next_checked_state
                    ))
                }>
                { "save" }
            </button>   
        </div>
    }
}

#[derive(PartialEq, Properties)]
pub struct TokSettingProps {
    dispatch: Dispatch<StoreUI>,
}

#[function_component(TokSettingComponent)]
pub fn tok_setting_component(TokSettingProps { dispatch } : &TokSettingProps) -> Html { 

    let (_appstore_state, appstore_dispatch) = use_store::<StoreApp>();//dispatcher.reduce_mut(|s| s.init_user_actions(fetched_user_actions));

    let u = UserModel::new(None, None, false);

    let tok = u.tok.unwrap().to_string();

    let user_tok_state = use_state(|| tok.clone());

    let user_tok_state_val = user_tok_state.clone();
    let user_tok_state_set = user_tok_state.clone( ); 

    let save_class = if (*user_tok_state) == tok || user_tok_state.len() != 5 { "disabled" } else { "" };
    
    let save_tok = Callback::from(move |_| {

        let dispatcher = appstore_dispatch.clone();
        let tok_save_result = UserModel::store_tok(&user_tok_state);
        
        match tok_save_result {
            Ok(t) => {
                wasm_bindgen_futures::spawn_local(async move {
                       
                    let fetched_user_actions : HashMap<ActionTypes, Vec<Collectable>> = get_user_actions().await;
        
                    dispatcher.reduce_mut(|s| s.init_user_actions(fetched_user_actions));
                })
            },
            Err(e) => {
                info!("Error saving user tok to storage");
            },
        }

        
       
    });

    html!{
        <div>    
        <label clas="blocklabel">{ "user Token" }</label>
        <input 
                type="text" 
                oninput={ move |e: InputEvent| {
                    let input: HtmlInputElement = e.target_unchecked_into();
                    let value = input.value();

                    user_tok_state_set.set(value);
                }}
                value={ (*user_tok_state_val).clone() }
            />
            <p>{ "lorem ipso dtiam non adiiscit eu fooler olor it amet et" }</p>
            <button 
                class={ save_class }
                onclick={  save_tok }>
                { "save" }
            </button>   
        </div>
    }
}