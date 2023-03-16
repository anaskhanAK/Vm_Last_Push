import { gql } from "@apollo/client";

export const USER_REGISTER = gql`
mutation CreateUser($input: createUserInput) {
  createUser(input: $input) {
    Deleted
    Email
    Password
    _count
    id
    firstName
    lastName
    token
    userImage
    userType
  }
}
`

export const USER_LOGIN = gql`
mutation Login($input: LoginInput) {
  Login(input: $input) {
    Deleted
    Email
    Password
    _count
    firstName
    id
    lastName
    token
    userImage
    userType
  }
}
`

export const USER_PROFILE_UPDATE = gql`
mutation Mutation($input: updateUserInput) {
  updateUser(input: $input) {
    id
    firstName
    lastName
    Email
    Password
    Deleted
    token
    userImage
    userType
    _count
  }
}
`

export const CHANGE_USER_PASSWORD = gql`
mutation Mutation($input: resetPasswordInput) {
  resetPassword(input: $input)
}
`

export const EMAIL_VERIFICATION = gql`
mutation Mutation($input: forgetPasswordInput) {
  forgetPassword(input: $input)
}
`

export const CREATE_ISO = gql`
mutation Mutation($input: createISOInput) {
  createISO(input: $input) {
    id
    Name
    Type
    userId
    createdAt
    Size
  }
}
`

export const CREATE_VM = gql`
mutation CreateVM($input: createVMInput) {
  createVM(input: $input) {
    id
    guId
    Config
    Status
    virtualMachineName
    Title
    Description
    vmImage
    storageId
  }
}
`

export const UPDATE_VM = gql`
mutation Mutation($input: upadteVMInput) {
  upadteVM(input: $input) {
    id
    guId
    Config
    Status
    virtualMachineName
    Title
    Description
    vmImage
    storageId
    diskId
  }
}
`
export const DELETE_VM = gql`
mutation Mutation($input: deleteVMInput) {
  deleteVM(input: $input)
}
`
export const DELETE_USER = gql`
mutation Mutation($input: deleteUserInput) {
  deleteUser(input: $input)
}
`

export const VM_ACTION = gql`
mutation Mutation($input: forStatusInput) {
  forStatus(input: $input)
}
`

export const DELETE_ISO = gql`
mutation Mutation($input: deleteISOInput) {
  deleteISO(input: $input)
}
`