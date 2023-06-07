use std::{
    collections::HashMap, 
    fmt::{
        Formatter,
        Result,
        Display,
    },
};

use log::info;

pub struct SettingsConfig {
    items: HashMap<ConfigKeys, ConfigItem>
}

pub struct ConfigItem {
    default: bool,
    key: &'static str,
    val: Option<bool>,
}


#[derive(Debug, PartialEq, Eq, Hash)]
pub enum ConfigKeys {
    PersistingPrompt,
    Tracking,
    Toast,
}

pub fn storage_val_from_str (v: String) -> bool {
    if v == "true" { true } else  { false }
}

pub fn storage_val_from_bool (v: bool) -> String {
    if v == true { "true".to_string() } else  { "false".to_string() }
}

impl Display for ConfigKeys {

    fn fmt(&self, f: &mut Formatter) -> Result {
        match *self {
            ConfigKeys::Tracking => write!(f, "tracking settings"),
            ConfigKeys::PersistingPrompt => write!(f, "persisting prompt settings"),
            ConfigKeys::Toast => write!(f, "toast setting"),
        }
    }
}

impl SettingsConfig {

    pub fn new () -> Self {
        
        let mut items = HashMap::<ConfigKeys, ConfigItem>::new();

        items.insert(ConfigKeys::Tracking, ConfigItem {
            default: true,
            key: "tracking",
            val: None,
        });

        items.insert(ConfigKeys::PersistingPrompt, ConfigItem {
            default: true,

            key: "prompt",
            val: None,
        });

        items.insert(ConfigKeys::Toast, ConfigItem {
            default: true,
            key: "toast",
            val: None,
        });

        Self {
            items
        }
    }

    pub fn populate (&mut self) {

        let storage: web_sys::Storage = web_sys::window().unwrap().local_storage().unwrap().unwrap();

        let tracking_val_result : Option<String> = storage.get_item(self.items.get(&ConfigKeys::Tracking).unwrap().key).unwrap();

        if tracking_val_result.is_some() {
           
            self.items.insert(ConfigKeys::Tracking, ConfigItem {
                default: true,
                key: "tracking",
                val: Some(storage_val_from_str(tracking_val_result.unwrap())),
            });
        } else {
            
            let tracking_default = self.items.get(&ConfigKeys::Tracking).unwrap().default;

            self.items.insert(ConfigKeys::Tracking, ConfigItem {
                default: true,
                key: "tracking",
                val: Some(tracking_default),
            });
        }

        let persisting_prompt_val_result : Option<String> = storage.get_item(self.items.get(&ConfigKeys::PersistingPrompt).unwrap().key).unwrap();

        if persisting_prompt_val_result.is_some() {
           
            self.items.insert(ConfigKeys::Tracking, ConfigItem {
                default: true,
                key: "prompt",
                val: Some(storage_val_from_str(persisting_prompt_val_result.unwrap())),
            });
        } else {
            
            let persisting_prompt_default = self.items.get(&ConfigKeys::PersistingPrompt).unwrap().default;

            self.items.insert(ConfigKeys::Tracking, ConfigItem {
                default: true,
                key: "prompt",
                val: Some(persisting_prompt_default),
            });
        }

        let toast_val_result : Option<String> = storage.get_item(self.items.get(&ConfigKeys::Toast).unwrap().key).unwrap();

        if toast_val_result.is_some() {
           
            self.items.insert(ConfigKeys::Tracking, ConfigItem {
                default: true,
                key: "prompt",
                val: Some(storage_val_from_str(toast_val_result.unwrap())),
            });
        } else {
            
            let toast_default = self.items.get(&ConfigKeys::Toast).unwrap().default;

            self.items.insert(ConfigKeys::Tracking, ConfigItem {
                default: true,
                key: "prompt",
                val: Some(toast_default),
            });
        }
    }

    pub fn set_config_setting_value (self: &mut Self, config_key: ConfigKeys, val: bool) {
        
        let storage: web_sys::Storage = web_sys::window().unwrap().local_storage().unwrap().unwrap();
        let config_item = self.items.get(&config_key);

        if config_item.is_some() {
            
            let result = storage.set_item(config_item.unwrap().key, storage_val_from_bool(val).as_str());

            match result {
                Ok(_) => {
                    self.populate();
                    ()
                },
                Err(_) => info!("Error saving config setting to local storage")
            }
        }
    }

    pub fn get_config_setting_value (self: &Self, config_key: ConfigKeys) -> Option<bool> {
        let val = self.items.get(&config_key).unwrap().val;

        val
    }
}