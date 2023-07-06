use log::info;
use yewdux::store::Store;
use serde::{Serialize, Deserialize};

use crate::{
    util::wasm_bridge::notify_user,
    settings::{
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

        info!("StoreUI::Default -------- {:?}", settings);
        
        Self {
            msg: "",
            busy: false,
            settings_ui: false,
            settings, 
        }
    }
}

impl StoreUI {

    pub fn set_config (&mut self, k: &ConfigKeys, val: bool) {
       self.settings.set_config_setting_value(k, val);

       notify_user("Your settings change has ben saved", true);
    }

    pub fn toggle_settings_ui (&mut self) {
        self.settings_ui = !self.settings_ui;
    }
}