
use yew::{
    Html, 
    Properties, 
    Callback, 
    html,
    function_component,
    use_effect,
};

use crate::{
    models::{
        project_model::ProjectModel, 
    },
    components::{
        widget::rich_text_paragraph::RichTextParagraphComponent,
    },
    util::wasm_bridge,
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

    use_effect(move || {
        wasm_bridge::scroll_top();
    });

    html! {
        <div class={ c_name } id={ format!("slot-{}", c_uid) }>
            <h2>
                {
                    if *bookmarked {
                        html!{
                            <span>
                                <i class="fa fa-bookmark bookmark" />
                                { &project.name  }
                            </span>
                            
                        }
                    } else {
                        html!{
                            <span>{ &project.name  }</span>
                        }
                    }
                }
                <i 
                    class={if *selected { "job-selector selected fa fa-chevron-right"} else { "job-selector fa fa-chevron-right" }}
                    onclick={ move |_| project_detail.emit(c_uid) }
                />
            </h2>
            <h3>
                <RichTextParagraphComponent
                    text={ project.notes.clone() }
                />
            </h3>
            <ul>
            { 
                project.status.iter().map(|ps| {
                    
                    html! { <li class="itemised"><RichTextParagraphComponent text={ ps.clone() } /></li> }
                }).collect::<Html>()
            }
            </ul>  
        </div>        
    }
}