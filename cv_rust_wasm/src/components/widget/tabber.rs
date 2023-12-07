use std::fmt::Debug;

use log::info;
use yew::{
    function_component, 
    html,
    Html,
    Properties, Callback
};
use yew_router::hooks::use_navigator;

use crate::{models::{StaticAsset, ModelTypes}, routes::AppRoute};

#[derive(PartialEq, Properties)]
pub struct TabberProps <T: StaticAsset + PartialEq>{
    pub items: Vec<Vec<T>>,
    pub page: usize,
    pub on_select_tab: Callback<usize>,
    pub sectione_model_type: ModelTypes,
}


#[function_component(TabberComponent)]
pub fn tabber<T: StaticAsset + PartialEq + Debug>(TabberProps { items, page, on_select_tab, sectione_model_type } : &TabberProps<T>) -> Html {


    // info!("{:?}", items.iter().map(|item| &item[0].get_daterange().unwrap().formatted()));

    let mut idx = 0;

    let nav = use_navigator().unwrap();
    

    let tabs = items.iter().map(|item| {
        
        if item.len() == 0 {
            return html!{<span></span>}
        }
        
        let on_select_tab_c = on_select_tab.clone();

        let nav_back = nav.clone();

        // info!("ONE ITEM ---------------------------");
        // info!("{:?}", item);

        let last = &item[0];
        let first = &item[item.len() - 1];

        let first_period = first.get_daterange().unwrap();
        let last_period = last.get_daterange().unwrap();

        let first_year = first_period.get_year_from();
        let first_year_str = first_year.to_string();

        let last_year =  last_period.get_year_to();
        let last_year_str = last_year.to_string();


        let body_str = format!("{}-{}", first_year_str, &last_year_str[2..4]);//&last_year_str[2..4]
        // info!("{}", body_str);
        let c_sectione_model_type = sectione_model_type.clone();

        let markup = html!{
            <li>
            <button 
                onclick={ move |_|{ 
                    
                    let curr_route = if c_sectione_model_type == ModelTypes::Job { &AppRoute::JobsRoute {} } else { &AppRoute::ProjectsRoute {} };

                    nav_back.push(curr_route);
                    on_select_tab_c.emit(idx);
                }}
                class={ if *page != idx { "" } else { "disabled" }}
            >
            { body_str }
            </button></li>
        };

        idx = idx + 1;

        markup
    }).collect::<Html>();

    html!{  
        <ul class="StyledTabber">
        {
          tabs  
        }
        </ul>
    }
}