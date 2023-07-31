use yew_router::prelude::*;

#[derive(Clone, Routable, PartialEq)]
pub enum AppRoute {
    #[at("/")]
    HomeRoute,
    #[at("/jobs")]
    JobsRoute,
    #[at("/jobs/:uid")]
    JobsDetailRoute{ uid: usize },
    #[at("/projects")]
    ProjectsRoute,
    #[at("/projects/:uid")]
    ProjectsDetailRoute{ uid: usize },
    #[at("/personal")]
    PersonalRoute,
    #[not_found]
    #[at("/404")]
    NotFoundRoute,
}

