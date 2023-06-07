use yewdux::store::Store;
use serde::{Serialize, Deserialize};
// use gloo_timers::callback::Timeout;
use log::info;
// use settimeout::set_timeout;
// use wasm_timer::Delay;
// use yew_hooks::use_timeout;

use crate::util::timeout::do_that_thang;

async fn call_later()  {
    // wasm_timer::Delay::new(Duration::from_secs(3)).await.unwrap();
    
    info!("hey its me");
}

async fn run_timeout()  {
    // wasm_timer::Delay::new(Duration::from_secs(3)).await.unwrap();
    
    // info!("before");

    // let timeout_duration = Duration::from_secs(5);
    
    // set_timeout(timeout_duration).await;

    // info!("hey its me but AFTER");
}

#[derive(Debug, PartialEq, Eq, Clone, Serialize, Deserialize, Store)]
pub struct StoreUI {
    pub msg: &'static str,
    pub busy: bool,
    pub ban_tracking_feedback: bool,
}

impl Default for StoreUI {
    fn default() -> Self {
        Self {
            msg: "",
            busy: false,
            ban_tracking_feedback: false,
        }
    }
}

impl StoreUI {

    pub fn ban_feedback_tmp (&mut self) {
        self.ban_tracking_feedback = true;
    }

    pub fn notify (&mut self, msg: &'static str) {

        do_that_thang();

        self.busy = true;
        self.msg = msg;

        let mut c_self = self.clone();

        // info!("HERE!!!!!!!!");

        // wasm_bindgen_futures::spawn_local(run_timeout());
        // let reset_ui = async move {

        //     let timeout_duration = core::time::Duration::from_secs(5);

        //     set_timeout(timeout_duration).await;

        //     c_self.busy = false;
        //     c_self.msg = "";
        // };
    
        // wasm_bindgen_futures::spawn_local(reset_ui);

        // info!("hey its GLOO");
        // let timeout = Timeout::new(5_000, move || {
        //     // Do something after the one second timeout is up!
        //     info!("hey its GLOO but AFTER");
        // });
        
        info!("hey its HOK 2");
        // use_timeout(move || {
        //     c_self.busy = false;
        //     info!("hey its HOK 2 but AFTER");
        // }, 3000);
    }
}