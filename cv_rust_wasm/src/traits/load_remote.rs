pub trait LoadResource {
    fn load_resource (&self) -> Option<Self> where Self: Sized;
} 

pub trait LoadAction {
    fn load_action (&self) -> Option<Self> where Self: Sized;
} 