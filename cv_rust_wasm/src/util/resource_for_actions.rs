use yewdux::prelude::Dispatch;

use crate::{
    appdata::stores::{
        store_app::StoreApp,
    }, 
    models::ModelTypes,
};

pub fn set_state_modal_item (dispatcher: Dispatch<StoreApp>, res_type: ModelTypes, res_id: usize) -> () {

    dispatcher.reduce_mut(|s| {
        s.set_modal_item(
            res_type,
            res_id,
        );
    })
}