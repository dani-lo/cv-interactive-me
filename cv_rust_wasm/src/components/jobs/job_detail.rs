use yew::{
    function_component,
    html,
    Html,
    Properties,
};
use yewdux::prelude::{use_store, Dispatch};

use crate::{
    appdata::stores::store_app::StoreApp, components::widget::{
        job_type::JobTypeComponent, rich_text_paragraph::RichTextParagraphComponent, tech::TechComponent
    }, models::{company_model::CompanyModel, field_model::FieldModel, ModelTypes}, traits::{ 
        can_annotate::Annotation, 
        can_bookmark::Bookmark
    }, util::{
        action_for_resource::resource_annotation, resource_for_actions::set_state_modal_item
    }
};


#[derive( PartialEq, Properties)]
pub struct JobDetailProps {
    pub selected_job_uid:  Option<usize>,
}

#[function_component(JobDetailComponent)]
pub fn job_detail(JobDetailProps { 
        selected_job_uid, 
    } : &JobDetailProps) -> Html {
    
    let (state, dispatch) = use_store::<StoreApp>();
    
    if selected_job_uid.is_some() {

        let static_mods = state.static_models.clone();
        let hashes = static_mods.model_hashes.jobs.clone();

        let job_id = selected_job_uid.unwrap();

        let job_opt = hashes.get(&job_id);

        if job_opt.is_none() {

            return html!{
                <></>
            }
        }

        let job = job_opt.unwrap().clone();

        let notes: Vec<Annotation> = state.annotations.clone().to_vec();
        let bookmarks: Vec<Bookmark> = state.bookmarks.clone().to_vec();
        
        let job_note = resource_annotation(ModelTypes::Job, &job.uid, &notes);
        
        let bookmarked =  bookmarks
            .iter()
            .fold(false, |acc, n: &Bookmark| {

                if acc {
                    return true
                }

                n.resource_id == job.uid && n.resource_type == ModelTypes::Job
            });

        // let mut c_name = "StyledJobDetail";

        // if bookmarked { c_name = "bookmarked StyledJobDetail"; }

        let c_job = job.clone();
        let dispatcher = dispatch.clone();

        html! {
            <div class="StyledJobDetail">
                <h2 onclick={ move |_| { 
                    set_state_modal_item(dispatch.clone(), ModelTypes::Job, job.uid)
                }}>
                    <span class="action-wrap">
                        <span class="html-icon"><i class="fa fa-plus" aria-hidden="true" /></span>
                        <span>{ &job.period.formatted() }</span>
                    </span>
                    {
                        if bookmarked {

                            html!{
                                <span>
                                    <i class="fa fa-bookmark bookmark" />
                                </span>
                                
                            }
                        } else {
                            html!{
                                <></>
                            }
                        }
                    }
                    
               </h2>
                {
                    if job_note.is_some() {
                        html! {
                            <div class="StyledAnnotation">
                                <p>{ "\"" }{ job_note.unwrap().text }{ "\"" }</p>
                            </div>
                        }
                    } else {
                        html!{ <></> }
                    }
                }
                <h3>{ job.position }</h3>
                {
                    if job.company.is_some() {
                       html!{ 
                            <CompanyComponent
                                company={ job.company.clone().unwrap() }
                                dispatch={ dispatcher.clone() }
                                bookmarks={ bookmarks.clone() }
                            />
                        }
                    } else {
                        html!{
                            <h3>{"Various agencies"}</h3>
                        }
                    }
                }
                <JobTypeComponent
                    job_jobtypes={ job.job_type.clone() }
                    actionable={ true }
                    detail={ true }
                />  
                <ul>
                    <JobsDescriptionListComponent 
                        description={ c_job.description } 
                        
                    />
                </ul>
                              
                <TechComponent
                    job_uid={ job.uid }
                    actionable={ true }
                    job_techs={ c_job.tech }
                />
            </div>        
        }
    } else {
        html!{
            <div></div>
        }
    }
}


#[derive(Properties, PartialEq)]
pub struct JobDescriptionListProps {
    description: Vec<String>,
}

#[function_component(JobsDescriptionListComponent)]
pub fn job_list(JobDescriptionListProps { description }: &JobDescriptionListProps) -> Html {

    description.iter().map(|d: &String| {
        html! {
            <li>
                <RichTextParagraphComponent text={ d.clone() } />
            </li>
        }
    }).collect()
}

#[derive( PartialEq, Properties, Clone)]
pub struct CompanyProps {
    pub company:  CompanyModel,
    pub dispatch: Dispatch<StoreApp>,
    pub bookmarks: Vec<Bookmark> ,
}

#[function_component(CompanyComponent)]
pub fn company_component(CompanyProps { company, dispatch, bookmarks } : &CompanyProps) -> Html {

    let company_id = company.uid.clone();
    let dispatcher = dispatch.clone();

    let bookmarked =  bookmarks
        .iter()
        .fold(false, |acc, n: &Bookmark| {

            if acc {
                return true
            }

            n.resource_id == company.uid && n.resource_type == ModelTypes::Company
        });
    
    html! {
        <div class="StyledCompanyContainer">
            <h3>
                <span 
                    class="action-wrap"
                    onclick={move |_| { 
                        set_state_modal_item(
                            dispatcher.clone(),
                            ModelTypes::Company, 
                            company_id
                        );
                    }}>
                    <span class="html-icon">
                        <i class="fa fa-plus" aria-hidden="true" />
                    </span>
                    <span>{ company.name.clone() }</span>
                </span>
                {
                    if bookmarked {

                        html!{
                            <span>
                                <i class="fa fa-bookmark bookmark" />
                            </span>
                            
                        }
                    } else {
                        html!{
                            <></>
                        }
                    }
                }
            </h3>
            <p>{ company.description.clone() }</p>
            <FieldsItemsComponent fields={ company.field.clone() } />
        </div>   
    }
}

#[derive( PartialEq, Properties, Clone)]
pub struct FieldsProps {
    pub fields: Vec<FieldModel>
}

#[function_component(FieldsItemsComponent)]
pub fn fields_items_component(FieldsProps { fields } : &FieldsProps) -> Html {
    
    let (state, dispatch) = use_store::<StoreApp>();
        
    html! {
 
            <ul>
                {
                    fields.iter().map(|field| {
                    
                        let dispatcher = dispatch.clone();
                        let field_id = field.uid.clone();

                        html!{
                            <li class="itemised">
                                <span 
                                    class="action-wrap"
                                    onclick={move |_| { 
                                        set_state_modal_item(
                                            dispatcher.clone(), 
                                            ModelTypes::Field, 
                                            field_id
                                        );
                                    }}>
                                    <span class="html-icon">
                                        <i class="fa fa-plus" aria-hidden="true" />
                                    </span>
                                    <span>{ field.clone().name }</span>
                                </span>
                            </li>
                        }
                    }).collect::<Html>()
                }
            </ul>
    }
}