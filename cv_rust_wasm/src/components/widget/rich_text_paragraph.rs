use std::str::Split;
use yew::{
    function_component,
    html,
    Html,
    Properties,
};

#[derive( PartialEq, Properties)]
pub struct RichTextParagraphProps {
    pub text: String,
}

#[function_component(RichTextParagraphComponent)]
pub fn rich_text_paragraph (RichTextParagraphProps { text } : &RichTextParagraphProps) -> Html {
    
    let parts: Split<&str> = text.split("_");

    let mut parts_vec = Vec::new();

    for part in parts {
        parts_vec.push(part);
    }

    html!{
        <span>
        {
            parts_vec.iter().map(|str_part| {
                if str_part.contains("#") {
                    html!{ <strong>{ str_part.replace("#", "") }</strong> }
                } else {
                    html!{ <span>{ str_part }</span> }
                }
            }).collect::<Html>()
        }
        </span>
    }
}