use yew::{
    function_component, 
    html,
    Html,
    Properties,
};
use yewdux::prelude::use_store;

use crate::{
    models::{ 
        ModelTypes, 
        jobtype_model::{
            JobtypeModel, 
            JobtypePrefix
        } 
    }, 
    appdata::stores::{
        store_app::StoreApp
    },
    util::resource_for_actions::set_state_modal_item,
};

#[derive( PartialEq, Properties)]
pub struct JobTypeProps {
    pub job_jobtypes: Vec<JobtypeModel>,
    pub actionable: bool,
}


#[function_component(JobTypeComponent)]
pub fn job_type(JobTypeProps { 
            job_jobtypes, 
            // set_modal_item,
            actionable} : &JobTypeProps) -> Html {
        // return html!{<p>{"lllllll"}</p>}
        let (_store, dispatch) = use_store::<StoreApp>();

        let jobtype_place : Vec<JobtypeModel> = job_jobtypes
            .clone()
            .iter()
            .filter(|jt| jt.prefix == JobtypePrefix::PLACE)
            .cloned()
            .collect();

        let jobtype_time : Vec<JobtypeModel> = job_jobtypes
            .clone()
            .iter()
            .filter(|jt| jt.prefix == JobtypePrefix::TIME)
            .cloned()
            .collect();

        html!{  
            <div>
                <JobTypeTypeComponent 
                    job_type_type={ jobtype_place }
                    actionable={ actionable }
                />
                <JobTypeTypeComponent 
                    job_type_type={ jobtype_time }
                    actionable={ actionable }
                />
            </div>   
    }
}

#[derive( PartialEq, Properties)]
pub struct JobTypeTypeProps {
    job_type_type: Vec<JobtypeModel>,
    actionable: bool,
}

#[function_component(JobTypeTypeComponent)]
pub fn job_type(JobTypeTypeProps { 
        job_type_type, 
        actionable} : &JobTypeTypeProps) -> Html {

    let (_store, dispatch) = use_store::<StoreApp>();

    html!{  
        <ul>
            {
                job_type_type.iter().map(|jt| {

                    let c_jobtype = jt.clone();

                    html!{
                        <li class="itemised">
                        {
                            if *actionable {
                                let disatcher = dispatch.clone();
                                html!{
                                    <span class="action-wrap">
                                        <i 
                                            class="action fa fa-plus" 
                                            onclick={ move |_| set_state_modal_item(disatcher.clone(), ModelTypes::Jobtype, c_jobtype.uid)} 
                                        />
                                        <span>{ "working from: " }{ &jt.name }</span>
                                    </span>
                                }
                            } else { 
                                html!{
                                    <span>{"type: "}{ &jt.name }</span>
                                }
                            }
                        }     
                        </li>
                    }
                }).collect::<Html>()
            }
        </ul>
    }
}
