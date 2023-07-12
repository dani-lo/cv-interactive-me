use yew::{
    function_component, 
    html,
    Html,
    Properties, 
    UseStateHandle, 
    use_state, 
};
use yewdux::prelude::use_store;

use crate::{
    models::{ 
        ModelTypes, 
        tech_model::TechModel,
    }, 
    appdata::stores::{
        store_app::StoreApp
    },
};

#[derive(PartialEq, Properties)]
pub struct TechProps {
    pub job_uid: usize,
    pub job_techs: Vec<TechModel>,
    pub actionable: bool,
}


#[function_component(TopbarComponent)]
pub fn topbar() -> Html {
    

    // let (_state, dispatch) = use_store::<StoreApp>();

    // let less_techs = 4;
    // let skip_truncation = job_techs.len() < 4;

    // let show_tech_num:  UseStateHandle<&'static str>  = use_state(|| "less");
    
    // let show_techs = if !skip_truncation && *show_tech_num == "less" { 
    //     &job_techs[..less_techs] 
    // } else { 
    //     &job_techs 
    // };

    html!{  
        <div class="StyledMobileBar">
            <span 
                class="html-icon"
                // onClick={() => {

                //     setClearSelections()
                //     //router.back()
                // }}
                // 
                >
                <i 
                    aria-hidden="true" 
                    class="fa fa-arrow-left" 
                />   
            </span>
        <span className="html-icon">
            <i aria-hidden="true" className="fa fa-bars" />
        </span>
    </div>
    }
}