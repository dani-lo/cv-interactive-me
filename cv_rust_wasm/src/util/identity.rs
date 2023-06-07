use crate::traits::ActionModeltarget;

pub fn actionables_ident<T : ActionModeltarget>(a: &T, b: &T) -> bool {

    b.get_resource_type_type() == a.get_resource_type_type() &&
    b.get_resource_type_uid() == a.get_resource_type_uid()
}