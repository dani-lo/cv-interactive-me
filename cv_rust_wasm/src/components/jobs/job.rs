use log::info;

use yew::{
    Html, 
    Properties, 
    Callback, 
    function_component,
    html,
    use_effect,
};

use fixedstr::fstr;

use crate::{
    components::widget::job_type::JobTypeComponent,
    models::job_model::JobModel, 
    traits:: can_annotate::Annotation, 
    util::wasm_bridge,
    
};

#[derive(PartialEq, Properties)]
pub struct Props {
    pub job:  JobModel,
    pub on_select_job_detail: Callback<usize>,
    pub selected: bool,
    pub bookmarked: bool,
    pub job_annotations: Vec<Annotation>,
    pub is_filtered_out: bool,
    pub is_paginated_out: bool,
}

#[function_component(JobComponent)]
pub fn job(Props {
    job,
    on_select_job_detail,
    selected,
    bookmarked,
    job_annotations,
    is_filtered_out,
    is_paginated_out
}: &Props) -> Html {

    let c_job = job.clone(); 
    let c_uid = c_job.uid.clone();
    let c_job_detail = on_select_job_detail.clone();       

    let mut c_name = "StyledJobContainer".to_owned();

    if *bookmarked { c_name.push_str(" bookmarked"); }
    if *selected { c_name.push_str(" selected"); }
    if *is_paginated_out { c_name.push_str(" paginated");}
    if *is_filtered_out { c_name.push_str(" disabled") };

    let at_company_name = if job.company.is_none() { "Various Agencies".to_string() } else { format!("{}", &job.company.as_ref().unwrap().name) };

    let desc = job.description[0].clone();

    // let desc_text:fstr<80> = fstr::make(&desc);

    html! {
        <div class={ c_name } id={ format!("slot-{}", c_uid) } onclick={ move |_| c_job_detail.emit(c_uid) }>
            <h2>
                {
                    if *bookmarked {
                        html!{
                            <span>
                                <i class="fa fa-bookmark bookmark" />
                                { &job.period.formatted()  }
                            </span>
                            
                        }
                    } else {
                        html!{
                            <span>{ &job.period.formatted()  }</span>
                        }
                    }
                }
                <i 
                    class={if *selected { "job-selector selected fa fa-chevron-right"} else { "job-selector fa fa-chevron-right" }}
                    
                />
            </h2>
            <h3>{ job.position.clone() }{", "}{ at_company_name }</h3>
            // <h2>{ job.title.clone() }</h2>
            // <p>{ desc_text }{"..."}</p>
            <JobTypeComponent
                job_jobtypes = { job.job_type.clone() }
                detail={ false }
                actionable={ false }
            />
        </div>    
    }
}