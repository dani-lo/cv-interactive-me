
use yew::{
    Html, 
    Properties, 
    Callback, 
    function_component,
    html
};

use crate::{
    components::widget::job_type::JobTypeComponent,
    models::job_model::JobModel, 
    traits:: can_annotate::Annotation, 
};

#[derive(PartialEq, Properties)]
pub struct Props {
    pub job:  JobModel,
    pub on_select_job_detail: Callback<usize>,
    pub selected: bool,
    pub bookmarked: bool,
    pub job_annotations: Vec<Annotation>,
    // pub store: UseReducerHandle<StoreState>,
    // pub set_modal_item: Callback<Actionable>,
}

#[function_component(JobComponent)]
pub fn job(Props {
    job,
    on_select_job_detail,
    selected,
    bookmarked,
    job_annotations,
    // store,
    // set_modal_item,
}: &Props) -> Html {

        let c_job = job.clone(); 
        let c_uid = c_job.uid.clone();
        // let c_set_modal_item_job = set_modal_item.clone();
        let c_job_detail = on_select_job_detail.clone();       

        let mut c_name = "StyledJobContainer".to_owned();

        if *bookmarked { c_name.push_str(" bookmarked"); }
        if *selected { c_name.push_str(" selected"); }

        let at_company_name = if job.company.is_none() { "".to_string() } else { format!(" @ {}", &job.company.as_ref().unwrap().name) };

        html! {
            <div class={ c_name }>
            <h2>
                <span>{ &job.period.formatted()  }</span>
            {
                if *bookmarked {
                    html!{
                        <i class="fa fa-bookmark bookmark" />
                    }
                } else {
                    html!{
                        <span></span>
                    }
                }
            }
            </h2>
            <div class="job-list-body">
                <div>
                    <h3>{ &job.period.formatted() } { at_company_name }</h3>
                    <JobTypeComponent
                        job_jobtypes = { job.job_type.clone() }
                        // set_modal_item={ set_modal_item.clone() }
                        actionable={ false }
                    />
                </div>
                <div>
                        <i 
                            class={if *selected { "job-selector selected fa fa-chevron-right"} else { "job-selector fa fa-chevron-right" }}
                            onclick={ move |_| c_job_detail.emit(c_uid) }
                            id={ format!("job-selector-{}", c_uid   ) }
                        />
                </div>
            </div>
        </div>    
    }
}