use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {

    #[wasm_bindgen(js_namespace = WasmLinkJs)]
    fn notify(s: &str);
}

pub fn do_that_thang() {
    notify("ohh there! is my wasm thang!");
}