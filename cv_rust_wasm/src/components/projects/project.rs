
use yew::{
    Html, 
    Properties, 
    Callback, 
    html,
    function_component,
};

use crate::{
    models::{
        project_model::ProjectModel, 
    },
    components::{
        widget::rich_text_paragraph::RichTextParagraphComponent,
    },
};

#[derive( PartialEq, Properties)]
pub struct ProjectProps {
    pub project:  ProjectModel,
    pub on_select_project_detail: Callback<usize>,
    pub selected: bool,
    pub bookmarked: bool,
}

#[function_component(ProjectComponent)]
pub fn project(ProjectProps {
    project,
    on_select_project_detail,
    selected,
    bookmarked,
}: &ProjectProps) -> Html {

        let c_project = project.clone(); 
        let project_detail = on_select_project_detail.clone();       

        let mut c_name = "StyledJobContainer".to_owned();

        if *bookmarked { c_name.push_str(" bookmarked"); }
        if *selected { c_name.push_str(" selected"); }

        let c_uid = c_project.uid.clone();

        html! {
            <div class={ c_name }>
                <h2>
                    <span>{ &project.name  }</span>
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
                        <p class="margin-s">
                            <RichTextParagraphComponent
                                text={ project.notes.clone() }
                            />
                        </p>
                        <p class="margin-s">
                            <a href={ project.repo.clone() } target="_blank">
                                <strong>{ "Github Repo" }</strong>
                            </a>
                        </p>
                        <ul>
                        { 
                            project.status.iter().map(|ps| {
                                
                                html! { <li><RichTextParagraphComponent text={ ps.clone() } /></li> }
                                
                            }).collect::<Html>()
                        }
                        </ul>
                    </div>       
                    <div>
                        <i 
                            class={if *selected { "job-selector selected fa fa-chevron-right"} else { "job-selector fa fa-chevron-right" }}
                            onclick={ move |_| project_detail.emit(c_uid) }
                            id={ format!("job-selector-{}", c_uid   ) }
                        />
                    </div>
                </div>
            </div>        
        }
}