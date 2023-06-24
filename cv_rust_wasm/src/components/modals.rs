use yew::{
    function_component, 
    html, 
    Html,  
};
use yewdux::prelude::use_store;

use crate::{
    models::ModelTypes,
    appdata::stores::{
        store_app_types::Actionable, 
        store_app::StoreApp,
    }, 
    traits::{ 
        bookmarkable, 
        filterable, 
        annotateable 
    }, 
    util::{
        timeout::notify_user,
        resource_name::resource_name,
    },
    components::actions::user_actions::{
        BookmarkComponent,
        FilterComponent,
        AnnotationComponent,
    },
};

#[function_component]
pub fn ActionsModalComponent () -> Html {

    let (state, dispatch) = use_store::<StoreApp>();

    let dispatcher = dispatch.clone();
    
    let resource_modal_item = state.modal_item;

    if !resource_modal_item.resource_id.is_some() || resource_modal_item.resource_id.unwrap() == 0  {
        return html!{<></> }
    }

    let res_type: ModelTypes = resource_modal_item.resource_type.unwrap();

    let bookmarkable_modal_item: Option<Actionable> = if bookmarkable(res_type) { Some(resource_modal_item) } else { None };
    let filterable_modal_item: Option<Actionable> = if filterable(res_type) { Some(resource_modal_item) } else { None };
    let annotatable_modal_item: Option<Actionable> = if annotateable(res_type) { Some(resource_modal_item) } else { None };

    let static_models = state.static_models.clone();
    
    let modal_title = resource_name(
        &static_models.model_hashes, 
        resource_modal_item.resource_type.unwrap(), 
        resource_modal_item.resource_id.unwrap()
    );

    html! {
        <div class="clibwasm-modal-wrap">
            <div></div>
            <div class="StyledModalWrap">
                <div>
                    <h2>{ modal_title.type_name } { " - " } { modal_title.name }</h2>
                    <span 
                        class="btn-close"
                        onclick={
                            move |_| {
                                dispatcher.reduce_mut(|s| s.unset_modal_item())
                            }
                        }
                        >
                            <i class="fa fa-times" />
                            // {"CLOSE"}
                    </span>
                    <BookmarkComponent
                        item={ bookmarkable_modal_item.clone() }
                        type_name={ modal_title.type_name }
                        dispatcher={ dispatch.clone() }
                        bookmarks={ Some(state.bookmarks.clone()) }
                        annotations={ Some(state.annotations.clone()) }
                        filters={ Some(state.filters.clone()) }
                    />
                    <FilterComponent
                        item={ filterable_modal_item.clone() } 
                        type_name={ modal_title.type_name }
                        dispatcher={ dispatch.clone() }
                        bookmarks={ Some(state.bookmarks.clone()) }
                        filters={ Some(state.filters.clone()) }
                        annotations={ Some(state.annotations.clone()) }
                    />
                    <AnnotationComponent
                        item={ annotatable_modal_item.clone() }  
                        type_name={ modal_title.type_name }
                        dispatcher={ dispatch.clone() }
                        bookmarks={ Some(state.bookmarks.clone()) }
                        annotations={ Some(state.annotations.clone()) }
                        filters={ Some(state.filters.clone()) }
                    /> 
                </div>
            </div>
        </div>
    }
}