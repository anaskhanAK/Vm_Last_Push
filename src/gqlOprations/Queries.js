import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
query Query($input: getUserByIDInput) {
  getUserByID(input: $input) {
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

export const GET_IOS_BY_ID = gql`
query GetAllISO($input: getISOByIdInput) {
  getISOById(input: $input) {
    id
    Name
    userId
    Type
    createdAt
    Size
  }
}
`

export const GET_CONFIG = gql`
  query Query {
    getConfigFile
  }
  `

export const GET_USER_VMS = gql`
query Query($input: getUserAllVMInput) {
  getUserAllVM(input: $input) {
    vmImage
    id
    guId
    Config
    Status
    virtualMachineName
    Title
    Description
    storageId
  }
}
  `

export const GET_SPECIFIC_VM = gql`
query Query($input: getSpecificVMInput) {
  getSpecificVM(input: $input) {
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

export const GET_ALL_USERS = gql`
query GetUserList($input: getUserListInput) {
  getUserList(input: $input) {
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

export const GET_ALL_VMS = gql`
query GetUserAllVM($input: getAllVMInput) {
  getAllVM(input: $input) {
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

export const CHECK_VM_NAME = gql`
query Query($input: findVMNameInput) {
  findVMName(input: $input)
}
  `

