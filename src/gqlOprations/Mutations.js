import { gql } from "@apollo/client";

export const USER_REGISTER = gql `
mutation CreateUser($input: UserInput) {
    createUser(input: $input) {
      id
      firstName
      lastName
      Email
      Password
      Deleted
    }
  }
  `

export const USER_LOGIN = gql `
mutation Mutation($input: forLogin) {
  login(input: $input) {
    id
    Email
    token
    userType
  }
}
`