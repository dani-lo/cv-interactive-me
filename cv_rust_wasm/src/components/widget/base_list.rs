use log::info;

use yew::{
    function_component, 
    html,
    Html,
    Properties, 
};

use crate::components::widget::rich_text_paragraph::RichTextParagraphComponent;

#[derive(PartialEq, Properties)]
pub struct BaselistProps {
    pub list_items: Vec<String>,
}


#[function_component(BaseListComponent)]
pub fn base_list(BaselistProps {  list_items} : &BaselistProps) -> Html {

    html!{
        <ul class="StyledBaseList">
        {
            html!{ 
                list_items.iter().map(|item| {

                    html!{
                        <RichTextParagraphComponent
                            text={ item.clone() }
                        />
                    }
                }).collect::<Html>()
            }
        }
        </ul>
    }
}