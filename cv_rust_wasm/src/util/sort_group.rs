use std::collections::HashMap;

use crate::{
    models::ModelTypes,
    traits::ActionModeltarget,
};

pub fn collectionables_vector_to_grouped_hash <T>(vect: Vec<T>) -> HashMap<ModelTypes, Vec<T>> 
        where T: ActionModeltarget + Clone {

    let mut grouped: HashMap<ModelTypes, Vec<T>> = HashMap::new();
    
    for item in &vect {

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