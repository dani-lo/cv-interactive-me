use yew::{
    prelude::*, 
};
use yew_router::prelude::*;
use yewdux::prelude::use_store;

mod models;
mod appdata;
mod api;
mod components;
mod util;
mod libstyled;
mod routes;
mod traits;
mod screens;
mod settings;

use crate::{
    appdata::stores::{
        store_ui::StoreUI,
    }, 
    screens::{
        jobs::JobsComponent,
        projects::ProjectsComponent,
        personal::PersonalComponent,
    },
    components::actions::actions_pending::PendingActionsComponent,
    components::widget::topbar::TopbarComponent,
};

use routes::AppRoute;

static mut CV_APP_LOADED: Option<bool> = Some(false);

#[function_component(App)]
fn app() -> Html {
    
    // info!("{:?}", std::env::args());

    let (ui_state, _ui_dispatch) = use_store::<StoreUI>();

    let ui_busy = ui_state.busy;
    let ui_msg = ui_state.msg;

    fn switch(routes: AppRoute) -> Html {
         
        match routes {
            AppRoute::HomeRoute => html! { <h1>{ "Home" }</h1> },
            AppRoute::JobsRoute => html! { <JobsComponent route_id={ None } /> },
            AppRoute::JobsDetailRoute { uid } => html! { <JobsComponent route_id={ Some(uid) } /> },            
            AppRoute::ProjectsRoute => html! {<ProjectsComponent route_id={ None } /> },
            AppRoute::ProjectsDetailRoute { uid } => html! {<ProjectsComponent route_id={ Some(uid) } /> },
            AppRoute::PersonalRoute => html! { <PersonalComponent /> },
            AppRoute::NotFoundRoute => html! { <h1>{ "404" }</h1> },
        }
    }

    html! {
        <div>
            <TopbarComponent />
            <PendingActionsComponent />
            { 
                if ui_busy {
                    html!{
                        <div class="StyledLoaderRipple">
                            <div class="bg"></div>
                            <div>
                                <div></div>
                                <div></div>
                            </div>
                            {
                                if ui_msg.len() > 0 {
                                    html!{
                                        <p><span>{ ui_msg }</span></p>
                                    } 
                                } else { 
                                    html!{ <></>}
                                }
                            }
                        </div>
                    }
                } else {
                    html!{ <></>}
                }
            }
            <BrowserRouter>
                <Switch<AppRoute> render={switch} />
            </BrowserRouter>
        </div>
    }
}

fn main() {
    wasm_logger::init(wasm_logger::Config::default());
    
    yew::Renderer::<App>::new().render();
}