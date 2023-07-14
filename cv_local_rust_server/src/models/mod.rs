use serde::{
    Serialize,
    Deserialize,
};

#[derive(Deserialize, Serialize)]
pub struct CompanyData {
    pub uid: usize,
    pub name: String,
    pub description: String,
    pub field: Vec<usize>
}

#[derive(Deserialize, Serialize)]
pub struct FieldData {
    pub uid: usize,
    pub name: String,
}

#[derive(Deserialize, Serialize)]
pub struct  JobData {
    pub uid: usize,
    pub description: Vec<String>,
    pub title: String,
    pub company: Option<usize>,
    pub from: (u32, i32),
    pub to: (u32, i32),
    pub tech: Vec<usize>,
    pub tech_str: String,
    pub position: String,
    pub jobType: Vec<usize>,
}

#[derive(Deserialize, Serialize)]
pub struct JobtypeData {
    pub uid: usize,
    pub name: String,
    pub prefix: String,
}

#[derive(Deserialize, Serialize)]
pub struct TechData {
    pub uid: usize,
    pub name: String,
}

#[derive(Deserialize, Serialize)]
pub struct ProjectData {
    pub uid: usize,
    pub name: String,
    pub description: Vec<String>,
    pub status: Vec<String>,
    pub live_url: String,
    pub repo: String,
    pub notes: String,
    pub tech: Vec<usize>,
    pub from: (u32, i32),
    pub to: (u32, i32),
}
