use crate::{
    traits::can_filter::Filter, 
    models::Model
};

pub fn resource_is_included<T: Model> (filters: &Vec<Filter>, resource: &T) -> bool{
    let mut relevant_filters = filters.clone();

    relevant_filters.retain(|f|  f.resource_type == resource.get_resource_type());
    
    relevant_filters.iter().fold(false, |acc, f: &Filter| {
        if f.resource_id == resource.get_resource_id() {
            return true
        }
        return acc
    })
}

pub fn some_resource_included_in_all_filters<T: Model> (filters: &Vec<Filter>, resources: &Vec<T>) -> bool {

    let res_type_target = resources[0].get_resource_type();

    let mut relevant_filters = filters.clone();

    relevant_filters.retain(|f|  f.resource_type == res_type_target);

    if relevant_filters.len() == 0 {
        return true;
    }

    relevant_filters.iter().fold(true, |acc, f| {
        if acc == true && !resources.iter().any(|resource: &T| resource.get_resource_id() == f.resource_id) {
            return false 
        }
        return acc
    })
}