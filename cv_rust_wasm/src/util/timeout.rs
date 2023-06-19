use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {

    #[wasm_bindgen(js_namespace = wasm_bridge_app)]
    fn notify(s: &str);
}

pub fn notify_user(msg: &str) {
    notify(msg);
}