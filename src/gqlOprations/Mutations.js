import { gql } from "@apollo/client";

export const USER_REGISTER = gql `
mutation CreateUser($input: UserInput) {
    createUser(input: $input) {
      id
      First_Name
      Last_Name
      Email
      Password
      Deleted
    }
  }
  `

export const USER_LOGIN = gql `
mutation Mutation($input: for_login) {
  Login(input: $input) {
    First_Name
    Last_Name
    User_Type
    id
    token
    Email
  }
}
`

export const USER_PROFILE_UPDATE = gql `
mutation Mutation($input: userInput) {
  updateUser(input: $input) {
    User_Image
    First_Name
    Last_Name
    Email
    token
  }
}
`

export const CHANGE_USER_PASSWORD = gql `
mutation Mutation($input: Authentication) {
  resetPassword(input: $input)
}
`