use std::collections::HashMap;
use std::cmp::Ordering::{
    Greater,
    Less,
};

use crate::{
    models::{ModelTypes, Model},
    traits::ActionModeltarget,
};

pub fn sorting_fn_weight (item: ModelTypes) -> usize {
    if item == ModelTypes::Job {
        return 1;
    } else if item == ModelTypes::Project {
        return 2;
    } else if item == ModelTypes::Company {
        return 3;
    } else if item == ModelTypes::Field {
        return 4;
    } else {
        return 5;
    }
} 

pub fn collectionables_vector_to_grouped_hash <T>(vect: Vec<T>) -> HashMap<ModelTypes, Vec<T>> 
        where T: ActionModeltarget + Clone {

    let mut grouped: HashMap<ModelTypes, Vec<T>> = HashMap::new();
    
    let mut sorted = vect.clone();
    
    sorted.sort_by(|a, b| {

        if sorting_fn_weight(a.get_resource_type_type()) > sorting_fn_weight(b.get_resource_type_type()) {
            return Greater
        } else {
            return Less
        }
        
    }) ;

    for item in &sorted {

        let mtype = item.get_resource_type_type();

        if grouped.get(&mtype).is_none() {
            grouped.insert(mtype.clone(), Vec::new());
        }

        let mut target_vec_ref = grouped.get(&mtype).unwrap().clone();

        target_vec_ref.push(item.clone());

        grouped.insert(mtype.clone(), target_vec_ref);
    }

    grouped
}