use yew::{
    function_component, 
    html,
    Html,
    Properties, 
    UseStateHandle, 
    use_state, 
};
use yewdux::prelude::use_store;

use crate::{
    models::{ 
        ModelTypes, 
        tech_model::TechModel,
    }, 
    appdata::stores::{
        store_app::StoreApp
    },
};

#[derive(PartialEq, Properties)]
pub struct TechProps {
    pub job_uid: usize,
    pub job_techs: Vec<TechModel>,
    pub actionable: bool,
}


#[function_component(TechComponent)]
pub fn job_tech(TechProps { 
            job_uid,
            job_techs, 
            actionable} : &TechProps) -> Html {
    

    let (_state, dispatch) = use_store::<StoreApp>();

    let less_techs = 4;
    let skip_truncation = job_techs.len() < 4;

    let show_tech_num:  UseStateHandle<&'static str>  = use_state(|| "less");
    
    let show_techs = if !skip_truncation && *show_tech_num == "less" { 
        &job_techs[..less_techs] 
    } else { 
        &job_techs 
    };

    html!{  
        <div>
            <h3>{ "Technical Resume" }</h3>
            <ul>
            {
                show_techs.iter().map(|jt| {

                    let c_tech = jt.clone();

                    html!{
                        <li class="itemised">
                        {
                            if *actionable {

                                let dispatcher = dispatch.clone();

                                html!{
                                    <span class="action-wrap"
                                        onclick={
                                            move |_| dispatcher.reduce_mut(|s| s.set_modal_item(
                                                ModelTypes::Tech,
                                                c_tech.uid
                                            ))
                                    }>
                                        <span class="html-icon"><i class="fa fa-plus" aria-hidden="true" /></span> 
                                        <span>{ &jt.name }</span>
                                    </span>
                                }
                            } else { 
                                html!{
                                    <span>{ &jt.name }</span>
                                }
                            }
                        }
                            
                        </li>
                    }
                }).collect::<Html>()
            }
            {
                if *show_tech_num == "less" && job_techs.len() > 4 {
                    html!{
                        <li class="list-footer-meta-action" onclick={ move |_| show_tech_num.set("more") }><strong>{"show more"}</strong></li>
                    }
                } else if job_techs.len() > 4 {
                    html!{
                        <li class="list-footer-meta-action" onclick={ move |_| show_tech_num.set("less") }><strong>{"show less"}</strong></li>
                    }
                } else {
                    html!{}
                }
            }
            </ul>
        </div>
    }
}