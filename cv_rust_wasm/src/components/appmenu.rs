use yew::{
    Html, 
    function_component, 
    html, 
};
use yew_router::prelude::*;

use crate::routes::AppRoute;

#[function_component(AppMenuComponent)]
pub fn appmenu() -> Html {

    html!{
        <ul class="nav">
            <li><Link<AppRoute> to={AppRoute::JobsRoute }>{ "WORK" }</Link<AppRoute>></li>
            <li><Link<AppRoute> to={AppRoute::ProjectsRoute }>{ "PROJECTS" }</Link<AppRoute>></li>
            <li><Link<AppRoute> to={AppRoute::PersonalRoute }>{ "PERSONAL" }</Link<AppRoute>></li>
        </ul>
    }
}