use std::collections::HashMap;
use std::fmt::{Formatter, Display};

use log::info;
use serde::{Serialize, Deserialize};

use strum::IntoEnumIterator;
use strum_macros::EnumIter;


#[derive(Debug, PartialEq, Eq, Hash, Clone, Serialize, Deserialize)]
pub struct ConfigItem<T> {
    pub default: bool,
    pub key: String,
    pub val: Option<bool>,
    pub desc: String,
    pub label: String,
    pub disabled: bool,
    pub disable_dependency: Option<DisableDependency<T>>,
}

#[derive(Debug, PartialEq, Eq, Hash, Clone, Serialize, Deserialize, EnumIter)]
pub enum ConfigKeys {
    ShowPersistFeedback,
    AutoPersist,
}

pub fn storage_val_from_str (v: String) -> bool {
    if v == "true" { true } else  { false }
}

pub fn storage_val_from_bool (v: bool) -> String {
    if v == true { "true".to_string() } else  { "false".to_string() }
}

#[derive(Clone, Debug, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub struct  DisableDependency<T> {
    disable_if_key: ConfigKeys,
    disable_if_value: T,
}

impl Display for ConfigKeys {

    fn fmt(&self, f: &mut Formatter) -> Result<(), std::fmt::Error> {
        
        match *self {
            ConfigKeys::ShowPersistFeedback => write!(f, "show persist feedback"),
            ConfigKeys::AutoPersist => write!(f, "auto persist changes"),
        }
    }
}


#[derive(Debug, PartialEq, Eq, Clone, Serialize, Deserialize)]
pub struct SettingsConfig {
    pub items: HashMap<ConfigKeys, ConfigItem<bool>>,
}

impl SettingsConfig {

    pub fn new () -> Self {
        
        let mut items = HashMap::new();

        items.insert(ConfigKeys::AutoPersist, ConfigItem {
            default: true,
            key: "auto_persist".to_string(),
            val: None,
            desc: "If set to true, the app will automatically persist your changes: they will be saved to database and indexed under your user token.".to_string(),
            label: "Auto Persist".to_string(),
            disable_dependency: None,
            disabled: false,
        });

        items.insert(ConfigKeys::ShowPersistFeedback, ConfigItem {
            default: true,
            key: "show_persist_feedback".to_string(),
            val: None,
            desc: "If set to true, the app will always ask you to manually persist your changes.".to_string(),
            label: "Show Persist Feedback".to_string(),
            disable_dependency: Some(DisableDependency { disable_if_key: ConfigKeys::AutoPersist, disable_if_value: true }),
            disabled: false,
        });

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

        self.run_disable_dependencies();
    }

    pub fn set_config_setting_value (self: &mut Self, config_key: &ConfigKeys, val: bool) {
        
        let storage: web_sys::Storage = web_sys::window().unwrap().local_storage().unwrap().unwrap();
        let config_item = self.items.get(&config_key);

        if config_item.is_some() {
            
            let result = storage.set_item(config_item.unwrap().key.as_str(), storage_val_from_bool(val).as_str());

            match result {
                Ok(_) => {
                    self.read_value_into_item(&config_key);
                    self.run_disable_dependencies();
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

    pub fn run_disable_dependencies (self: &mut Self)  {

        for config_key in ConfigKeys::iter() {

            let setting_opt = self.items.get(&config_key);
            let setting = setting_opt.unwrap();

            let disable_dep_option = setting.disable_dependency.clone();

            if disable_dep_option.is_some() {

                let disable_dep = disable_dep_option.unwrap();

                let target_val_opt = self.get_config_setting_value(&disable_dep.disable_if_key);

                if target_val_opt.is_some() {

                    let target_val = target_val_opt.unwrap();

                    let item = self.items.get_mut(&config_key).unwrap();

                    if target_val == disable_dep.disable_if_value {
                        item.disabled = true;
                    } else {
                        item.disabled = false;
                    }
                }
            }
        }
    }
}