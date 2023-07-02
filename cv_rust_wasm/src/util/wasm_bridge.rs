use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {

    #[wasm_bindgen(js_namespace = wasm_bridge_app)]
    fn notify(s: &str, b: bool);

    #[wasm_bindgen(js_namespace = wasm_bridge_app)]
    fn show_active_slot(slot_id: usize);
}

pub fn notify_user(msg: &str, success: bool) {
    notify(msg, success);
}

pub fn scroll_to_slot (slot_id: usize) {
    show_active_slot(slot_id);
}