
use std::fmt;

#[derive(Debug, Clone)]
pub struct ActionsApiError;

impl fmt::Display for ActionsApiError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "invalid first item to double")
    }
}