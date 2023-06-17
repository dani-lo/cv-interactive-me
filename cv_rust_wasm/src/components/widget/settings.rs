use log::info;
use yew::{
    function_component, 
    html,
    Html,
    use_state, 
    Properties,
};
use yewdux::prelude::{use_store, Dispatch};

use crate::{
    appdata::stores::store_ui::StoreUI,
    util::settings_config::{
        ConfigKeys, 
        ConfigItem
    },
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
                onclick={ move |_| settings_ui_dipatcher.reduce_mut(|s| s.toggle_settings_ui()) }
                style={ "transform: rotate(180deg);display: inline-block;"}>
                {  	"\u{279c}" }
            </span> 
            {
                elements
            }
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
    
    let val: bool = setting.val.unwrap();
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