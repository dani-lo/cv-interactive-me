use std::collections::HashMap;
use std::fmt::{Formatter, Display};

use log::info;
use serde::{Serialize, Deserialize};

#[derive(Debug, PartialEq, Eq, Hash, Clone, Serialize, Deserialize)]
pub struct ConfigItem {
    pub default: bool,
    pub key: String,
    pub val: Option<bool>,
    pub desc: String,
    pub label: String,
}

#[derive(Debug, PartialEq, Eq, Hash, Clone, Serialize, Deserialize)]
pub enum ConfigKeys {
    ShowPersistFeedback,
    AutoPersist,
    UserTok,
}

pub fn storage_val_from_str (v: String) -> bool {
    if v == "true" { true } else  { false }
}

pub fn storage_val_from_bool (v: bool) -> String {
    if v == true { "true".to_string() } else  { "false".to_string() }
}

impl Display for ConfigKeys {

    fn fmt(&self, f: &mut Formatter) -> Result<(), std::fmt::Error> {
        
        match *self {
            ConfigKeys::ShowPersistFeedback => write!(f, "show persist feedback"),
            ConfigKeys::AutoPersist => write!(f, "auto persist changes"),
            ConfigKeys::UserTok => write!(f, "current user token"),
        }
    }
}


#[derive(Debug, PartialEq, Eq, Clone, Serialize, Deserialize)]
pub struct SettingsConfig {
    pub items: HashMap<ConfigKeys, ConfigItem>,
}

impl SettingsConfig {

    pub fn new () -> Self {
        
        let mut items = HashMap::new();

        items.insert(ConfigKeys::AutoPersist, ConfigItem {
            default: true,
            key: "auto_persist".to_string(),
            val: None,
            desc: "Lorem ipso dolor sit amet etiam non vai ben bene cosi - bugiarda quando ti conviene ..".to_string(),
            label: "Auto Persist".to_string(),
        });

        items.insert(ConfigKeys::ShowPersistFeedback, ConfigItem {
            default: true,
            key: "show_persist_feedback".to_string(),
            val: None,
            desc: "Lorem ipso dolor sit amet etiam non sei mica bugiarda quando ti conviene pero foo is a bar is a bar is a foo, usually".to_string(),
            label: "Show Persist Feedback".to_string(),
        });

        // items.insert(ConfigKeys::UserTok, ConfigItem {
        //     default: true,
        //     key: "_".to_string(),
        //     val: None,
        //     desc: "Lorem ipso dolor sit amet etiam non sei mica bugiarda quando ti conviene pero foo is a bar is a bar is a foo, usually".to_string(),
        //     label: "".to_string(),
        // });

        Self {
            items
        }
    }

    fn read_value_into_item (&mut self, item_key: &ConfigKeys) {
        
        let item_opt = self.items.get(&item_key);

        if (item_opt.is_some()) {

            let item = item_opt.unwrap();

            let storage: web_sys::Storage = web_sys::window().unwrap().local_storage().unwrap().unwrap();
            let storage_val : Option<String> = storage.get_item(item.key.as_str()).unwrap();

            if storage_val.is_some() {
            
                self.items.get_mut(&item_key).unwrap().val = Some(storage_val_from_str(storage_val.unwrap()));
            }
        }
    }

    pub fn populate (&mut self) {
 
        self.read_value_into_item(&ConfigKeys::ShowPersistFeedback);
        self.read_value_into_item(&ConfigKeys::AutoPersist);
    }

    pub fn set_config_setting_value (self: &mut Self, config_key: &ConfigKeys, val: bool) {
        
        let storage: web_sys::Storage = web_sys::window().unwrap().local_storage().unwrap().unwrap();
        let config_item = self.items.get(&config_key);

        if config_item.is_some() {
            
            let result = storage.set_item(config_item.unwrap().key.as_str(), storage_val_from_bool(val).as_str());

            match result {
                Ok(_) => {
                    self.read_value_into_item(&config_key);
                    ()
                },
                Err(_) => info!("Error saving config setting to local storage")
            }
        }
    }

    pub fn get_config_setting_value (self: &Self, config_key: &ConfigKeys) -> Option<bool> {
        
        let setting_opt = self.items.get(config_key);

        if setting_opt.is_none() {
            return None;
        }

        let setting = setting_opt.unwrap();

        if setting.val.is_none() {
            return Some(setting.default);
        }

        setting.val
    }
}