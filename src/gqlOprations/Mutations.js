import { gql } from "@apollo/client";

export const USER_REGISTER = gql `
mutation Mutation($input: userInput) {
  createUser(input: $input) {
    Email
    First_Name
    Last_Name
    Password
    User_Image
    id
    token
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

export const EMAIL_VERIFICATION = gql `
mutation ForgetPassword($input: forget_password) {
  forgetPassword(input: $input)
}
`