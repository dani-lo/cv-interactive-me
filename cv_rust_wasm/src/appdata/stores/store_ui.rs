use yewdux::store::Store;
use serde::{Serialize, Deserialize};

use crate::util::{
    timeout::do_that_thang, 
    settings_config::{
        SettingsConfig, 
        ConfigKeys,
    },
};

#[derive(Debug, PartialEq, Eq, Clone, Serialize, Deserialize, Store)]
pub struct StoreUI {
    pub msg: &'static str,
    pub busy: bool,
    pub settings_ui: bool,
    pub settings: SettingsConfig,
}

impl Default for StoreUI {
    fn default() -> Self {
        let mut settings = SettingsConfig::new();

        settings.populate();

        Self {
            msg: "",
            busy: false,
            settings_ui: false,
            settings, 
        }
    }
}

impl StoreUI {

    pub fn notify (&mut self, msg: &'static str) {

        do_that_thang();

        self.busy = true;
        self.msg = msg;
    }

    pub fn set_config (&mut self, k: &ConfigKeys, val: bool) {
       self.settings.set_config_setting_value(k, val);
    }

    pub fn toggle_settings_ui (&mut self) {
        self.settings_ui = !self.settings_ui;
    }
}