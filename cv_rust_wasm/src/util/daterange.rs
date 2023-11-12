use chrono::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, PartialOrd)]
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

   pub fn get_month_from (&self) -> usize {
      self.from_month_year.0 as usize
   }

   pub fn get_month_to (&self) -> usize {
      self.to_month_year.0 as usize
   }

   pub fn get_year_from (&self) -> usize {
      self.from_month_year.1 as usize
   }

   pub fn get_year_to (&self) -> usize {
      self.to_month_year.1 as usize
   }

   pub fn months_duration (&self) -> i32 {
      
      let from_month = i32::try_from(self.from_month_year.0).unwrap();
      let to_month = i32::try_from(self.to_month_year.0).unwrap();
      let from_year = i32::try_from(self.from_month_year.1).unwrap();
      let to_year = i32::try_from(self.to_month_year.1).unwrap();

      let years_diff = to_year - from_year;

      if years_diff == 0 {

         return to_month - from_month + 1
      } else {

         let full_years = years_diff - 1;
         let full_years_months = if full_years > 0 { full_years * 12 } else { 0 } ;

         return ((12 - from_month) + 1) + full_years_months + to_month;
      }

   }
}