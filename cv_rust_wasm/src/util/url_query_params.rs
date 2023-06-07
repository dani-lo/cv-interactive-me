use serde::Deserialize;
use serde_qs;

#[derive(Deserialize, Debug)]
pub struct AppQuery {
    pub uid: usize,
}

pub fn get_query_params (query_str: &str) -> Option<AppQuery>  {
    
    if query_str.contains("?uid") {

        let app_query : AppQuery = serde_qs::from_str(&query_str.replace("?", "")).unwrap();

        return Some(app_query)
    }

    None
}
