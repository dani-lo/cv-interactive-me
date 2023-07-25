use std::collections::HashMap;

use log::info;

use crate::models::{
    job_model::JobModel, 
    project_model::ProjectModel,
};

pub fn techs_with_months_duration (jobs: Vec<&JobModel>, projects: Vec<&ProjectModel>) -> HashMap<usize, i32> {

    let mut weights: HashMap<usize, i32> = HashMap::new();

    for job in jobs {

        // let job_duration = job.period.months_duration();

        for tech in &job.tech {

            if !weights.contains_key(&tech.uid) {
                weights.insert(tech.uid, 0);
            }

            weights.entry(tech.uid).and_modify(|x| *x += 1);
        }
    }

    for project in projects {

        // let project_duration = project.period.months_duration();

        for tech in &project.tech {

            if !weights.contains_key(&tech.uid) {
                weights.insert(tech.uid, 0);
            }

            weights.entry(tech.uid).and_modify(|x| *x += 1);
        }
    }

    weights
}

pub fn tech_weight (tech_id: usize, tech_weights: &HashMap<usize, i32>, max_tech: i32) -> i32 {

    let this_weight = tech_weights.get(&tech_id);

    if this_weight.is_none() {
        
        return 0
    }

    let percent = (100 *  this_weight.unwrap()) / max_tech;

    if percent > 75 {
        return 26
    } else if percent > 50 {
        return 22
    } else if percent > 25 {
        return 18
    } else {
        return 14
    }
}