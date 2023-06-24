use fixedstr::fstr;
use gloo_net::http::Request;
use log::info;
use rand::{thread_rng, Rng};
use rand::distributions::Alphanumeric;
use serde::Deserialize;
use wasm_bindgen::JsValue;


use crate::api::actions_api_func::ActionItemResponse;
use crate::api::config::{
    CvActionsEndpoints,
    get_actions_api_config,
};

pub fn cv_tok_key () -> &'static str { 
    "user_token"
}

// pub fn cv_ban_feedback_key () -> &'static str { 
//     "ban-user-tracking"
// }

// pub fn cv_ban_feedback_val () -> &'static str { 
//     "ban-user-tracking"
// }

#[derive(Debug, Clone, PartialEq, Deserialize)]
pub struct UserData <'a>{
    pub _id: Option<&'a str>,
    pub tok: Option<&'a str>,
}

#[derive(Debug, Clone, PartialEq, Deserialize)]
pub struct UserApiData {
    pub _id: String,
    pub tok: String,
}

#[derive(Debug, Clone, PartialEq, Copy)]
pub struct UserModel {
    pub _id: Option<fstr<24>>,
    pub tok: Option<fstr<5>>,
}


pub async fn get_user () -> Option<UserModel> {
    UserModel::new(None, None, false).load_resource().await
}

impl UserModel {

    pub fn new (
            _id: Option<fstr<24>>, 
            tok: Option<fstr<5>>, 
            force_new_tok: bool) -> Self {
        
        Self {
            _id: _id,
            tok: if tok.is_some() { tok } else { Some(Self::new_tok(force_new_tok)) },
        }
    }

    fn new_tok (force_new: bool) -> fstr<5> {

        
        let stored_tok : Option<String> = UserModel::retrieve_tok();

        if force_new || stored_tok.is_none() {
            
            let rand_tok: String = thread_rng()
                .sample_iter(&Alphanumeric)
                .take(5)
                .map(char::from)
                .collect();
 
            
            let store_result = UserModel::store_tok(&rand_tok);

            match store_result {
                Ok(res) => {
                    info!("{:?}", res);
                }
                Err(e) => {
                    info!("{:?}", e);
                },
            }
            
            return fstr::make(&rand_tok);

        } else {

            return fstr::make(&stored_tok.unwrap());
        }

    }

    fn retrieve_tok () -> Option<String> {

        let storage_key = cv_tok_key();
        let storage: web_sys::Storage = web_sys::window().unwrap().local_storage().unwrap().unwrap();

        let stored_tok : Option<String> = storage.get_item(storage_key).unwrap();

        stored_tok
    }

    async fn load_resource (&self) -> Option<UserModel> {

        let logged_in = self._id.is_some();

        if logged_in {
            return Some(self.clone());
        }

        if self.tok.is_none() {
            return None;
        }

        let conf = get_actions_api_config();
        let users_url: &'static str = conf.get(&CvActionsEndpoints::USER).unwrap();
        
        let user_query_url = format!("{}/{}", users_url, self.tok.unwrap());

        let user_get_request = Request::get(&user_query_url)
            .send()
            .await;

        // info!("{:?}",` user_request);

        match user_get_request {
            Ok(res) => {

                if res.status() == 404 {

                    let body_str = format!(
                        "{{ \"tok\": \"{}\" }}", 
                        self.tok.unwrap()
                    );
                
                    let body =  wasm_bindgen::JsValue::from_str(&body_str);
                    
                    let user_post_request = Request::post(users_url)
                        .header("Content-Type", "text/plain")
                        .body(body)
                        .send()
                        .await;
                    
                    match user_post_request {
                            Ok(post_res) => {
                
                                if post_res.status() != 200 {
                                    info!("Error loading user, operation aborted");
                                    return None;
                                }
                
                                let r_post: ActionItemResponse<UserApiData>  = post_res.json().await.unwrap();
                                let user_created_d = r_post.data.get("user").unwrap();
                                let fstr_id = fstr::make(&user_created_d._id);
                
                                return Some(UserModel {
                                    _id: Some(fstr_id),
                                    tok: self.tok,
                                })
                            },
                            Err(e) => {
                                info!("{}", e);
                                return None
                            },
                        }
                    
                }
                if res.status() != 200 {
                    return None;
                }

                let r: ActionItemResponse<UserApiData>  = res.json().await.unwrap();
                let user_d = r.data.get("user").unwrap();
                let fstr_id = fstr::make(&user_d._id);

                Some(UserModel {
                    _id: Some(fstr_id),
                    tok: self.tok,
                })
            },
            Err(e) => {
                info!("{}", e);
                None
            },
        }
    }

    pub fn store_tok (new_tok : &String) -> Result<(), JsValue> {

        let storage_key = cv_tok_key();
        let storage: web_sys::Storage = web_sys::window().unwrap().local_storage().unwrap().unwrap();

        let result = storage.set_item(storage_key, &new_tok);

        result
    }

    pub fn save_tok (&mut self, new_tok : &String) {

        let result = UserModel::store_tok(new_tok);

        match result {
            Ok(_) => {
                self.tok = Some(fstr::from(new_tok));
            },
            Err(_) => info!("Error saving TOK to local storage")
        }
    }

    // pub fn store_ban_trackig_feeback () {
    //     let storage_key = cv_ban_feedback_key();
    //     let storage_val = cv_ban_feedback_val();

    //     let storage: web_sys::Storage = web_sys::window().unwrap().self,  ocal_storage().unwrap().unwrap();

    //     let result = storage.set_item(storage_key, storage_val);

    //     match result {
    //         Ok(_) => (),
    //         Err(_) => info!("Error saving feedback setting to local storage")
    //     }
    // }
}
