import { gql } from "@apollo/client";

export const USER_REGISTER = gql`
mutation CreateUser($input: createUserInput) {
  createUser(input: $input) {
    deleted
    eMail
    password
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
    deleted
    eMail
    password
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
    eMail
    password
    deleted
    token
    userImage
    userType
    _count
  }
}
`

export const CHANGE_USER_PASSWORD = gql`
mutation Mutation($input: resetpasswordInput) {
  resetPassword(input: $input)
}
`

export const EMAIL_VERIFICATION = gql`
mutation Mutation($input: forgetpasswordInput) {
  forgetPassword(input: $input)
}
`

export const CREATE_ISO = gql`
mutation Mutation($input: createISOInput) {
  createISO(input: $input) {
    id
    name
    type
    userId
    createdAt
    size
  }
}
`

export const CREATE_VM = gql`
mutation CreateVM($input: createVMInput) {
  createVM(input: $input) {
    id
    guId
    config
    status
    virtualMachineName
    title
    description
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
    config
    status
    virtualMachineName
    title
    description
    vmImage
    storageId
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
mutation Mutation($input: forstatusInput) {
  forStatus(input: $input)
}
`

export const DELETE_ISO = gql`
mutation Mutation($input: deleteISOInput) {
  deleteISO(input: $input)
}
`

export const Create_Storage = gql`
mutation Mutation($input: createStorageInput) {
  createStorage(input: $input) {
    id
    storageName
    storageType
    storageSize 
  }
}
`