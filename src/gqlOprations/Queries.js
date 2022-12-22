import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
query GetUserByID($input: for_id_token) {
    getUserByID(input: $input) {
      User_Image
      First_Name
      Last_Name
      User_Type
      Email
    }
  }
  `

export const GET_USER_BY_ID_B = gql`
query GetUserByID($input: for_id_token) {
    getUserByID(input: $input) {
      User_Image
      First_Name
      Last_Name
      User_Type
      Email
    }
  }
  `