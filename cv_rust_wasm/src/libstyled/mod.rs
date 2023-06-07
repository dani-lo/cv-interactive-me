pub mod styled_elements;
pub mod css_rule;

#[macro_export]
macro_rules! some_styled {

    ($name:ident) => {
        
        #[derive(Properties, PartialEq)]
        struct SomeProps {
            titler: String
        }
         
         #[function_component(Divver)]
         pub fn divver_component(SomeProps { titler }: &SomeProps) -> Html {
            html! {
                <$name>{ titler }</$name>
            }
         }
    }
}


#[macro_export]
macro_rules! style_inline {
    ($( $key:ident => $value:expr),*) => {
        concat!($( css_rule!($key), ":", $value, ";" ),*)
    }
}
