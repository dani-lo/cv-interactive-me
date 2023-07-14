use yew::{
    Html, 
    function_component, 
    html, 
};
use yew_router::prelude::*;
use yew_router::history::{
    Location, 
    History, 
    BrowserHistory,
};

use crate::routes::AppRoute;

#[function_component(AppMenuComponent)]
pub fn appmenu() -> Html {

    let nav_location: Location = BrowserHistory::new().location();

    let link_cname = |curr_url_path: &str, target_url_path: &str| {
        if curr_url_path.contains(target_url_path) {
            return "active".to_string()
        } else {
            return "".to_string()
        }
    };

    let nav_loc = use_location();

    html!{
        <ul class="nav">
            <li class={ link_cname(nav_location.path(), "jobs") }>
                <Link<AppRoute> to={AppRoute::JobsRoute }>{ "WORK" }</Link<AppRoute>>
            </li>
            <li class={ link_cname(nav_location.path(), "projects") }>
                <Link<AppRoute> to={AppRoute::ProjectsRoute }>{ "PROJECTS" }</Link<AppRoute>>
            </li>
            <li class={ link_cname(nav_location.path(), "personal") }>
                <Link<AppRoute> to={AppRoute::PersonalRoute }>{ "PERSONAL" }</Link<AppRoute>>
            </li>
        </ul>
    }
}