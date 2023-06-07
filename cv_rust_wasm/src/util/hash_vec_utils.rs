use std::collections::HashMap;
use crate::models::StaticAsset;

pub fn hash_to_vec<U, T> (hash: HashMap<U, T>) -> Vec<T> where T : Clone {
    hash.values().cloned().collect()
}

pub fn hash_model_vec_by_uid<T, I, F> (
        model_data: Vec<T>,
        transform: F) -> HashMap<usize, I>  
        
            where  T : StaticAsset, F: Fn(T) -> I  {

    let mut hash = HashMap::new();

    for model_data_item in model_data {
        hash.insert(
            model_data_item.get_uid(),
            transform(model_data_item)
        );
    }
    
    hash
}