import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
query Query($input: getUserByIDInput) {
  getUserByID(input: $input) {
    userType
    userImage
    id
    firstName
    lastName
    eMail
    password
    deleted
    token
    _count
  }
}
  `

export const GET_IOS_BY_ID = gql`
query GetAllISO($input: getISOByIdInput) {
  getISOById(input: $input) {
    id
    name
    userId
    type
    createdAt
    size
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
    config
    status
    virtualMachineName
    title
    description
    storageId
  }
}
  `

export const GET_SPECIFIC_VM = gql`
query Query($input: getSpecificVMInput) {
  getSpecificVM(input: $input) {
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

export const GET_ALL_USERS = gql`
query Query($input: getUserListInput) {
  getUserList(input: $input) {
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

export const GET_ALL_VMS = gql`
query GetUserAllVM($input: getAllVMInput) {
  getAllVM(input: $input) {
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

export const CHECK_VM_NAME = gql`
query Query($input: findVMNameInput) {
  findVMName(input: $input)
}
  `

export const GET_UNUSED_DISKS = gql `
query Query {
  getUnAssignedDisk {
    id
    diskName
    diskSize
  }
}
`

export const GET_USER_POOLS = gql`
query GetStorageList($input: getStorageListInput) {
  getStorageList(input: $input) {
    id
    storageName
    storageType
    storageSize
  }
}
`
export const GET_STORAGE_DATA = gql`
query Disk($input: getStorageDetailsDisInput) {
  getStorageDetailsDisk(input: $input) {
    disk {
      id
      diskSize
      diskName
      storageId {
        storageName
        id
        storageSize
        storageType
      }
    }
    storage {
      storageType
      storageSize
      storageName
      id
    }
  }
}
`

export const GET_STORAGE_DATA_FOR_VM = gql`
query Disk($input: getStorageDetailsDisInput) {
  getStorageDetailsDisk(input: $input) {
    storage {
      storageName
      id
    }
  }
}
`

