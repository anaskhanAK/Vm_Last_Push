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

  export const GET_IOS_BY_ID = gql `
  query Query($input: for_search) {
    getIOSById(input: $input) {
      Name
      Size
      Type
      createdAt
      id
      userId
    }
  }
  `

  export const GET_CONFIG = gql `
  query Query {
    getConfigFile
  }
  `

  export const GET_USER_VMS = gql `
  query GetUserAllVM($input: for_search__user) {
    getUserAllVM(input: $input) {
      Config
      VM_Image
      Title
      Status
      GU_ID
      Description
      VirtualMachine_Name
      id
    }
  }
  `

