// use std::collections::HashMap;
// use log::info;
// use util::store_utils::state_pending_actions;
// use wasm_bindgen_futures::spawn_local;
// use yew::{
//     prelude::*, 
// };
// use yew_router::prelude::*;
// use yewdux::prelude::use_store;

// use crate::{
//     traits::ActionTypes, 
//     api::actions_api_func::persist_appstate_pending,
//     appdata::stores::{
//         store_app_types::Collectable, 
//         store_app::StoreApp,
//     }, 
//     models::user_model::{
//         UserModel, 
//         get_user
//     },
//     screens::{
//         jobs::JobsComponent,
//         projects::ProjectsComponent,
//     },
// };

// #[function_component(PendingActionsComponent)]
// pub fn pending_actions_component() -> Html {

//     let user = use_state(|| UserModel { _id: None, tok: None });
//     let c_user = user.clone();

//     let loading_future_spawn = async move {

//         let loaded_user = get_user().await;

//         user.set(loaded_user.unwrap());
//     };

//     use_effect_with_deps( move |_| {
//         if c_user._id.is_none() {
//             wasm_bindgen_futures::spawn_local(loading_future_spawn);
//         }
//         || ()
//     }, ());

//     let user_opts: UseStateHandle<bool> = use_state(|| false);
//     let ban_persist_tmp: UseStateHandle<bool> = use_state(|| false);
//     let ban_persist_always: UseStateHandle<bool> = use_state(|| false);

//     let (state, dispatch) = use_store::<StoreApp>();

//     let flush_dispatcher = dispatch.clone();
    
//     let all_pending = state_pending_actions(state);
//     let all_pending_len = all_pending.len();

//     let discard_pending: Callback<Option<yew::UiEvent>> = Callback::from(move |_e| {
//         flush_dispatcher.reduce_mut(|s| s.flush_pending());
//     });

//     let apply_pending : Callback<Option<yew::UiEvent>> = Callback::from(move |_e| {

//         let mut c_pending_annotations_collectables = all_pending.clone();
//         let mut c_pending_bookmarks_collectables = all_pending.clone();
//         let mut c_pending_filters_collectables = all_pending.clone();
        
//         c_pending_annotations_collectables.retain(|p| p.action_type == Some(ActionTypes::ANNOTATION));
//         c_pending_bookmarks_collectables.retain(|p| p.action_type == Some(ActionTypes::BOOKMARK));
//         c_pending_filters_collectables.retain(|p| p.action_type == Some(ActionTypes::FILTER));

//         let apply_dispatcher = dispatch.clone();
        
//         spawn_local(async move {

//             let persist_result: HashMap<ActionTypes, Vec<Collectable>> = persist_appstate_pending(
//                 c_pending_annotations_collectables, 
//                 c_pending_bookmarks_collectables, 
//                 c_pending_filters_collectables
//             ).await;

//             apply_dispatcher.reduce_mut(|s| s.apply_processed_pending(persist_result));
//         });
//     });
    
//     let c_user_opts = user_opts.clone();

//     let new_opt_value = if *user_opts { true } else { false };
    
//     let on_click_show_hide_opts = Callback::from(move |v: bool| c_user_opts.set(v));

//     if all_pending_len > 0 {

//         html!{
//             <div class="StyledPrompt"> // className={ `${ pendingActions.length ? 'active' : '' }` }
//                 <div class="prompt">
//                     <p><strong>{"You have "} { all_pending_len } {"pending changes"}</strong></p>
//                     <button 
//                         class="danger"
//                         onclick={ move |_| discard_pending.emit(None) }
//                     >{"Discard"}</button>
//                     <button
//                         class="ok"
//                         onclick={ move |_| apply_pending.emit(None) }
//                     >{"Apply"}</button>
//                 </div>
//                 <p class="actionable" onclick={ move |_| on_click_show_hide_opts.emit(new_opt_value) }>
//                 {
//                     if !new_opt_value {
//                        html!{ <i className="fa fa-chevron-down" />}
//                     } else {
//                         html!{<i className="fa fa-chevron-right" />}
//                     }
//                 }
//                 <span>{"Why am I seeing this?"}</span>
//                 </p>
//                 {
//                     if *user_opts {
//                         html!{
//                         <div>
//                             <div class="pending-actions-user-info">
//                                 <p>
//                                     {"This app tracks users by assigning a "}
//                                     <strong>{"random identifier"}</strong>
//                                     { " stored in session. 
//                                     If you would like to persist your actions (i.e filters, bookmrks, annotations) you can do so: after
//                                     persisting, your browser in future will automatically show your saved actions." }
//                                     <br />
//                                     {"You can also use the thus stored random identifier to access your actions from a different broswer, i.e "}
//                                     <strong>{"sharing"}</strong> 
//                                     {"your filters etc with colleagues"}
//                                  </p>
//                             </div>
//                             <div class="pending-actions-user-opts">
//                                 <p><strong>{"Do not show this again"}</strong></p>
//                                 <div class="StyledInputContainer pending-actions-user-opt">
//                                     <input type="checkbox" name="ban_persist_always" />
//                                     <label>{"Ever"}</label>
//                                 </div>
//                                 <div class="StyledInputContainer pending-actions-user-opt">
//                                     <input type="checkbox" name="ban_persist_tmp" />
//                                     <label>{"For the duration of this session"}</label>
//                                 </div>
//                                 <div class="StyledInputContainer pending-actions-user-opt">
//                                     <button onclick={ move |_e|{

//                                         if *ban_persist_always {
        
//                                             UserModel::store_ban_trackig_feeback()
//                                             // uiOperationSuccess(void 0)
//                                         } else if *ban_persist_tmp {
                                            
//                                             // uiOperationSuccess(void 0)
//                                         }
//                                     } }>{"Ok"}</button>
//                                 </div>
//                             </div>
//                         </div>
//                         }
//                     } else {
//                         html!{<></>}
//                     }
//                 }
//             </div>
//         }
//     } else {
//         html!{
//             <></>
//         }
//     }
// }
