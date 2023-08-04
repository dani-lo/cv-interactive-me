use log::info;

use yew::{
    function_component, 
    html,
    Html,
    Properties, 
    Callback, 
};

use yewdux::prelude::use_store;

use crate::{
    models::{ 
        ModelTypes, 
        tech_model::TechModel,
    }, 
    appdata::stores::{
        store_app::StoreApp, 
        store_ui::StoreUI,
    },
};

#[derive(PartialEq, Properties)]
pub struct TopbarProps {
    pub on_back: Callback<usize>,
    pub show_back_btn: bool,
}


#[function_component(TopbarComponent)]
pub fn topbar(TopbarProps { on_back, show_back_btn } : &TopbarProps) -> Html {

    let (ui_state, ui_dispatch) = use_store::<StoreUI>();
    let settings_ui_dipatcher = ui_dispatch.clone();
    let sidebar_ui_dipatcher = ui_dispatch.clone();
    let top_settings_ui_dipatcher = ui_dispatch.clone();
    let top_sidebar_ui_dipatcher = ui_dispatch.clone();

    let on_click_back = on_back.clone();

    let show_close_settings_button = ui_state.settings_ui;
    let show_close_sidebar_button = ui_state.sidebar_ui;

    let expanded = show_close_settings_button || show_close_sidebar_button;

    let cname = if expanded { "StyledMobileBar expanded" } else { "StyledMobileBar" };

    html!{  
        <div class={ cname }>
        {
            if *show_back_btn && !(show_close_settings_button || show_close_sidebar_button) {
                html!{
                    <span 
                        class="html-icon"
                        onclick={ move |_e| on_click_back.emit(0) }
                    >
                        <i 
                            aria-hidden="true" 
                            class="fa fa-arrow-left" 
                        />   
                    </span>
                }
            } else if show_close_sidebar_button {
                html!{
                    <span 
                        class="html-icon"
                        onclick={ move |_| sidebar_ui_dipatcher.reduce_mut(|s| s.toggle_sidebar_ui()) }>
                        <i class="fa fa-times" aria-hidden="true" />
                    </span> 
                }
            } else if show_close_settings_button {
                html!{
                    <span 
                        class="html-icon"
                        onclick={ move |_| settings_ui_dipatcher.reduce_mut(|s| s.toggle_settings_ui()) }>
                        <i class="fa fa-times" aria-hidden="true" />
                    </span> 
                }
            } else {
                html!{
                    <span></span>
                }
            }
        }
            
        <div>
            <span 
                class={ if ui_state.settings_ui || ui_state.sidebar_ui { "html-icon disabled" } else { "html-icon" } }
                onclick={ move |_| top_settings_ui_dipatcher.reduce_mut(|s| s.toggle_settings_ui()) }>
                    <i aria-hidden="true" class="fa fa-cog" />
            </span>
            <span 
            class={ if ui_state.settings_ui || ui_state.sidebar_ui { "html-icon disabled" } else { "html-icon" } }
                onclick={ move |_| top_sidebar_ui_dipatcher.reduce_mut(|s| s.toggle_sidebar_ui()) }>
                    <i aria-hidden="true" class="fa fa-bars" />
            </span>
        </div>
    </div>
    }
}