use std::collections::HashMap;

pub fn find_key_for_predicate<F, T>(
        map: &HashMap<usize, T>, 
        predicate: F) -> Option<&usize>
        
            where T: Copy, F: for<'r> Fn(&'r T) -> bool {

    map.iter().find_map(|(key, &val)| if predicate(&val) { Some(key) } else { None })
}