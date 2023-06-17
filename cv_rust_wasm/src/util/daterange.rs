use chrono::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct DateRange {
   from_month_year: (u32, i32),
   to_month_year: (u32, i32),
}

impl DateRange {

   pub fn new(
         from_month_year: (u32, i32), 
         to_month_year: (u32, i32)) -> Self {

      Self {
         from_month_year,
         to_month_year,
      }
   }

   pub fn formatted (&self) -> String {

      let date_time_from = Utc.with_ymd_and_hms(
         self.from_month_year.1, 
         self.from_month_year.0, 
         1, 
         1,  
         1, 
         1
      ).unwrap();

      let date_time_to = Utc.with_ymd_and_hms(
         self.to_month_year.1, 
         self.to_month_year.0, 
         1, 
         1,  
         1, 
         1
      ).unwrap();
      
      format!("{} - {}", date_time_from.format("%b %Y"), date_time_to.format("%b %Y"))
   }
}