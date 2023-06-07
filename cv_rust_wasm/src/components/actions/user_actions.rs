use log::info;
use fixedstr::str256;
use web_sys::HtmlInputElement;
use yew::prelude::*;
use yewdux::prelude::*;
use yewdux::prelude::{Dispatch, use_store};

use crate::appdata::stores::store_app_types::PendingStatus;
use crate::appdata::stores::{
    store_app_types::Actionable,
    store_app::StoreApp,
};

use crate::models::ModelTypes;
use crate::traits::{
    can_annotate::Annotation,
    can_bookmark::Bookmark,
    can_filter::Filter,
};


#[derive(Clone, PartialEq, Properties)]
pub struct ActionProps {
    pub item: Option<Actionable>,
    pub type_name: &'static str,
    pub dispatcher: Dispatch::<StoreApp>,
    pub annotations: Option<Vec<Annotation>>,
    pub bookmarks: Option<Vec<Bookmark>>,
    pub filters: Option<Vec<Filter>>,
}

pub enum Msg {}

pub struct BookmarkComponent {}

impl Component for BookmarkComponent {

    type Message = Msg;
    type Properties = ActionProps;

    fn create(ctx: &Context<Self>) -> Self {
        Self {}
    }

    fn view(&self, _ctx: &Context<Self>) -> Html {

        // let (state, dispatch) = use_store::<StoreApp>();

        let item = _ctx.props().item;
        let type_name = _ctx.props().type_name;
        let dispatcher = &_ctx.props().dispatcher;
        let bookmarks_opt = &_ctx.props().bookmarks;
        let bookmarks = bookmarks_opt.clone().unwrap();

        let c_item = item.clone();

        let add_bookmark : yew::Callback<Option<MouseEvent>> = dispatcher.reduce_mut_callback(move |s| {

            s.add_bookmark(Bookmark::from_resource(c_item.unwrap()));
        });

        if item.is_some() {
            
            let c_item = item.unwrap().clone();
            
            let res_type = &c_item.resource_type.unwrap();
            let res_id = &c_item.resource_id.unwrap();

            let collectable_for_actionable = bookmarks.iter().find(|bookmark| {
                bookmark.resource_type == *res_type && bookmark.resource_id == *res_id
            });

            let bookmark_exists = collectable_for_actionable.is_some();
            let btn_cname = if bookmark_exists { "disabled" } else { "" };

            html! {
                <div class="action">
                    <p>{ "Add a" }<strong>{ " bookmark " }</strong>{" for this "}{ type_name }</p>
                    <button 
                        class={ btn_cname }
                        onclick={ move |_| add_bookmark.emit(None) }
                    >{ "add" }</button>
                </div>
            } 
        } else {
            html! {
                <div class="action action-unactive">
                    <p>{ "Add a" }<strong>{ " bookmark " }</strong>{" for this "}{ type_name }</p>
                    <button>{ "add" }</button>
                </div>
            } 
        }
    }
}

pub struct FilterComponent {}

impl Component for FilterComponent {

    type Message = Msg;
    type Properties = ActionProps;

    fn create(ctx: &Context<Self>) -> Self {
        Self {}
    }

    fn view(&self, _ctx: &Context<Self>) -> Html {

        let item = _ctx.props().item;
        let type_name = _ctx.props().type_name;
        let dispatcher = &_ctx.props().dispatcher;
        let filters_opt = &_ctx.props().filters;
        let filters = filters_opt.clone().unwrap();

        let c_item = item.clone();

        let add_filter: yew::Callback<Option<MouseEvent>> = dispatcher.reduce_mut_callback(move |s| {

            s.add_filter(Filter::from_resource(&c_item.unwrap()));
        });

        if item.is_some() {

            let c_item = item.unwrap().clone();
            
            let res_type = c_item.resource_type.unwrap();
            let res_id = c_item.resource_id.unwrap();

            let collectable_for_actionable = filters.iter().find(|filter| {
                filter.resource_type == res_type && filter.resource_id == res_id
            });

            let filter_exists = collectable_for_actionable.is_some();
            let btn_cname = if filter_exists { "disabled" } else { "" };

            html! {
                <div class="action">
                    <p>{ "Add a" }<strong>{ " filter " }</strong>{"for this item: this will filter out all jobs that do not include this  "}{ type_name }</p>
                    <button 
                        class={ btn_cname }
                        onclick={ move |_| add_filter.emit(None) }
                    >{ "add" }</button>
                </div>
            } 
        } else {
            html! {
                <div class="action action-unactive">
                    <p>{ "Add a" }<strong>{ " filter " }</strong>{"for this item: this will filter out all jobs that do not include this  "}{ type_name }</p>
                    <button>{ "add" }</button>
                </div>
            } 
        }
    }
}


// pub struct AnnotationComponent {}

// impl Component for AnnotationComponent {

//     type Message = Msg;
//     type Properties = ActionProps;

//     fn create(ctx: &Context<Self>) -> Self {
//         Self {}
//     }

//     fn view(&self, _ctx: &Context<Self>) -> Html {

//         let item = _ctx.props().item;
//         let type_name = _ctx.props().type_name;
//         let dispatcher = &_ctx.props().dispatcher;
//         let annotations_opt = &_ctx.props().annotations;
//         let annotations = annotations_opt.clone().unwrap();

//         let c_item = item.clone();

//         let add_annotation: yew::Callback<Option<MouseEvent>> = dispatcher.reduce_mut_callback(move |s| {

//             s.add_annotation(Annotation::from_resource(&c_item.unwrap(), "tmp text"));
//         });

//         // let onkeypress = Callback::from(|e: KeyboardEvent| {
//         //     if e.key() == "Enter" {
//         //         let input = e.target_unchecked_into();
//         //         let value = input.value();

//         //         input.set_value("");
                
//         //         if !value.is_empty() {
//         //             dispatcher.reduce_mut(|s: StoreApp| {
//         //                 info!("s, {:?}", s);
//         //                 info!("value, {}", value);
                        
//         //             })
//         //         }
//         //     }
            
//         // });//.reduce_mut_callback_with(|s, e: KeyboardEvent| {
            
        

//         if item.is_some() {

//             let c_item = item.unwrap().clone();
            
//             let res_type = c_item.resource_type.unwrap();
//             let res_id = c_item.resource_id.unwrap();

//             let collectable_for_actionable = annotations.iter().find(|annotation| {
//                 annotation.resource_type == res_type && annotation.resource_id == res_id
//             });

//             let annotation_exists = collectable_for_actionable.is_some();
//             let btn_cname = if annotation_exists { "disabled" } else { "" };

//             html! {
//                 <div class="action">
//                     <p>{ "Add an" }<strong>{ " annotation " }</strong>{"for this  "}{ type_name }</p>
//                     <AnnotationTextComponent 
//                         res_id={ res_id }
//                         res_type={ res_type }
//                     />
//                     <button 
//                         class={ btn_cname }
//                         onclick={ move |_| add_annotation.emit(None) }
//                     >{ "add" }</button>
//                 </div>
//             } 
//         } else {
//             html! {
//                 <div class="action action-unactive" >
//                     <p>{ "Add an" }<strong>{ " annotation " }</strong>{" for this  "}{ type_name }</p>
//                     <button>{ "add" }</button>
//                 </div>
//             } 
//         }
//     }
// }

// #[derive( PartialEq, Properties, Clone)]
// pub struct AnnotationTextProps {
//     res_id: usize,
//     res_type: ModelTypes,
// }

#[function_component(AnnotationComponent)]
pub fn annotation_text (ActionProps {
    item,
    type_name,
    dispatcher,
    annotations,
    bookmarks,
    filters,
} : &ActionProps)  -> Html { 
    
    let (_state, dispatch) = use_store::<StoreApp>();

    let init_dispatch = dispatch.clone();

    let dependency = if item.is_some() {
        format!(
            "{}-{}", 
            item.unwrap().resource_id.unwrap(), 
            item.unwrap().resource_type.unwrap()
        )
    } else {
        "".to_string()
    };

    use_effect_with_deps(
        move |_| {
            init_dispatch.reduce_mut(|s: &mut StoreApp| {
                s.fresh_note_reset();
            });
        },
        dependency
    );

    if item.is_some() {

        let annotations_data = annotations.clone().unwrap();

        let c_annotations_data = annotations_data.clone(); 

        let c_resource_id = item.unwrap().resource_id.clone();
        let c_resource_type = item.unwrap().resource_type.clone();
        let c_item = item.unwrap().clone();
        
        let res_type = c_item.resource_type.unwrap();
        let res_id = c_item.resource_id.unwrap();

        let existing_fresh_note = annotations_data.into_iter().find(|n|  
            n.pending == PendingStatus::Fresh &&
            n.resource_id == c_resource_id.unwrap() &&
            n.resource_type == c_resource_type.unwrap()
        );

        let existing_annotation = c_annotations_data.iter().find(|n| {
            n.resource_type == res_type && 
            n.resource_id == res_id && 
            n.pending != PendingStatus::Fresh
        });
    
        let mut tgt_note = Annotation {
                _id: None,
                resource_id: c_resource_id.unwrap().clone(),
                resource_type: c_resource_type.unwrap().clone(),
                pending: PendingStatus::Fresh,
                text: "".to_string().clone(),
        };
        let added_note_exists = existing_annotation.is_some();
        let fresh_note_exists = existing_fresh_note.is_some();

        if added_note_exists {
            tgt_note = existing_annotation.unwrap().clone();
        } else if fresh_note_exists {
            tgt_note = existing_fresh_note.unwrap().clone();       
        }

        let new_status = if tgt_note.pending == PendingStatus::Void { PendingStatus::VoidThenEdited } else { PendingStatus::Added };
        let tgt_note_txt: str256 = str256::from(tgt_note.text);
        
        let add_annotation: yew::Callback<Option<MouseEvent>> = dispatcher.reduce_mut_callback(move |s| {

            let new_or_edited_note =  Annotation {
                    _id: None,
                    resource_id: c_resource_id.unwrap().clone(),
                    resource_type: c_resource_type.unwrap().clone(),
                    pending: new_status,
                    text: String::from(tgt_note_txt.to_str()),
            };
            s.add_annotation(new_or_edited_note);
        });

        let onkeypress = Callback::from(move |e: KeyboardEvent| {
            let input: HtmlInputElement = e.target_unchecked_into();
            let value : String= input.value();
                
            if !value.is_empty() {
                dispatch.reduce_mut(|s: &mut StoreApp| {
                    s.note_text(
                        String::from(value), 
                        c_resource_id.unwrap(), c_resource_type.unwrap()
                    );
                });
            }
        });

        html! {
            <div class="action">
                <p>{ "Add an" }<strong>{ " annotation " }</strong>{"for this  "}{ type_name }</p>
                <div>
                    <textarea
                        class="new-note"
                        placeholder="Enter annotation (max 256 characters)"
                        {onkeypress}
                        value={ String::from(tgt_note_txt.to_str()) }
                        rows={ 3 }
                        columns={50}
                        maxlength={ 256 }
                    ></textarea>
                    
                </div>
                {
                    if added_note_exists {
                        html!{
                            <button 
                                // class={ btn_cname }
                                onclick={ move |_| add_annotation.emit(None) }
                            >{ "update" }</button>
                        }
                    } else {
                        html!{
                            <button 
                                // class={ btn_cname }
                                onclick={ move |_| add_annotation.emit(None) }
                            >{ "add" }</button>
                        }
                    }
                }
                
            </div>
        } 
    } else {
        html! {
            <div class="action action-unactive" >
                <p>{ "Add an" }<strong>{ " annotation " }</strong>{" for this  "}{ type_name }</p>
                <button>{ "add" }</button>
            </div>
        } 
    } 
}