use log::info;
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
    pub detail: bool,
}


#[function_component(JobTypeComponent)]
pub fn job_type(JobTypeProps { 
            job_jobtypes, 
            actionable,
            detail } : &JobTypeProps) -> Html {

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


                    if *detail {
                        html!{
                            <>
                              
                                <JobTypeTypeListComponent
                                    job_type_type={ jobtype_place }
                                    actionable={ actionable }
                                    jobtype_pref={ "from: " }
                                />
                            
                                <JobTypeTypeListComponent 
                                    job_type_type={ jobtype_time }
                                    actionable={ actionable }
                                    jobtype_pref={ "type: " }
                                />
                                
                            </>
                        }
                    } else {
                        html!{
                            <>
                                <ul>
                                    <JobTypeTypeInlineComponent 
                                        job_type_type={ jobtype_place }
                                        actionable={ actionable }
                                        jobtype_pref={ "from: " }
                                    />
                                </ul>
                                <ul>
                                    <JobTypeTypeInlineComponent 
                                        job_type_type={ jobtype_time }
                                        actionable={ actionable }
                                        jobtype_pref={ "type: " }
                                    />
                                </ul>
                            </>
                        }
                    }
                }
               

#[derive( PartialEq, Properties)]
pub struct JobTypeTypeProps {
    job_type_type: Vec<JobtypeModel>,
    actionable: bool,
    jobtype_pref: &'static str,
}

#[function_component(JobTypeTypeInlineComponent)]
pub fn job_type_inline(JobTypeTypeProps { 
        job_type_type, 
        actionable,
        jobtype_pref} : &JobTypeTypeProps) -> Html {

    let (_store, dispatch) = use_store::<StoreApp>();

    let mut out_count = 0;

    html!{  
        <li class="itemised no-margin">
            <span style={ "padding-right: var(--gap-medium);" }>{ jobtype_pref }</span>
            {
                job_type_type.iter().map(|jt| {

                    let c_jobtype = jt.clone();

                    out_count = out_count + 1;
                    
                    html!{
                        <>
                        <span>
                        {
                            if *actionable {
                                let disatcher = dispatch.clone();
                                html!{
                                    <span 
                                        class="action-wrap"
                                        onclick={ move |_| {
                                            set_state_modal_item(disatcher.clone(), ModelTypes::Jobtype, c_jobtype.uid)
                                        }}>
                                        <span class="html-icon"><i class="fa fa-plus" aria-hidden="true" /></span>
                                        <span><strong>{ &jt.name }</strong></span>
                                    </span>
                                }
                            } else { 
                                html!{
                                    <span><strong>{ &jt.name }</strong></span>
                                }
                            }
                        }     
                        </span>
                        {
                            if out_count < job_type_type.len() {
                                html!{ <strong style="display:inline-block;margin: 0 0.5rem;">{ " + " }</strong> }
                            } else {
                                html!{ <span></span> }
                            }
                        }
                        </>
                    }
                }).collect::<Html>()

                
            }
        </li>
    }
}


#[function_component(JobTypeTypeListComponent)]
pub fn job_type_list(JobTypeTypeProps { 
        job_type_type, 
        actionable,
        jobtype_pref} : &JobTypeTypeProps) -> Html {

    let (_store, dispatch) = use_store::<StoreApp>();

    html!{  

        <ul>
            {
                job_type_type.iter().map(|jt| {

                    let c_jobtype = jt.clone();

                    html!{
                        <li class="itemised no-margin">
                        {
                            if *actionable {
                                
                                let dispatcher = dispatch.clone();

                                html!{
                                    <span 
                                        class="action-wrap"
                                        onclick={ move |_| set_state_modal_item(
                                            dispatcher.clone(), 
                                            ModelTypes::Jobtype, 
                                            c_jobtype.uid
                                        )}     
                                    >
                                        <span  
                                            class="html-icon"><i class="fa fa-plus" aria-hidden="true" /></span>
                                        <span><strong>{ &jt.name }</strong></span>
                                    </span>
                                }
                            } else { 
                                html!{
                                    <span><strong>{ &jt.name }</strong></span>
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
