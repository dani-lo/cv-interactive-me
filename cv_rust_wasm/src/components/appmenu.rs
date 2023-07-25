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
use yewdux::prelude::use_store;

use crate::appdata::stores::store_ui::StoreUI;
use crate::routes::AppRoute;

#[function_component(AppMenuComponent)]
pub fn appmenu() -> Html {

    let (_ui_state, ui_dispatch) = use_store::<StoreUI>();

    let sidebar_jobs_ui_dipatcher = ui_dispatch.clone();
    let sidebar_projects_ui_dipatcher = ui_dispatch.clone();
    let sidebar_personal_ui_dipatcher = ui_dispatch.clone();
    
    let nav_location: Location = BrowserHistory::new().location();

    let link_cname = |curr_url_path: &str, target_url_path: &str| {
        if curr_url_path.contains(target_url_path) {
            return "active".to_string()
        } else {
            return "".to_string()
        }
    };

    html!{
        <ul class="nav">
            <li class={ link_cname(nav_location.path(), "jobs") } onclick={
                move |_| sidebar_jobs_ui_dipatcher.reduce_mut(|s| s.toggle_sidebar_ui())
            }>
                <Link<AppRoute> to={AppRoute::JobsRoute }>{ "WORK" }</Link<AppRoute>>
            </li>
            <li class={ link_cname(nav_location.path(), "projects") } onclick={
                move |_| sidebar_projects_ui_dipatcher.reduce_mut(|s| s.toggle_sidebar_ui())
            }>
                <Link<AppRoute> to={AppRoute::ProjectsRoute }>{ "PROJECTS" }</Link<AppRoute>>
            </li>
            <li class={ link_cname(nav_location.path(), "personal") } onclick={
                move |_| sidebar_personal_ui_dipatcher.reduce_mut(|s| s.toggle_sidebar_ui())
            }>
                <Link<AppRoute> to={AppRoute::PersonalRoute }>{ "PERSONAL" }</Link<AppRoute>>
            </li>
        </ul>
    }
}