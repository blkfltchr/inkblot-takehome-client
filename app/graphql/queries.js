// eslint-disable
// this is an auto generated file. This will be overwritten

export const getContact = `query GetContact($id: ID!) {
  getContact(id: $id) {
    id
    name
    type
    email
    phonenumber
    photo
  }
}
`;
export const listContacts = `query ListContacts(
  $filter: ModelContactFilterInput
  $limit: Int
  $nextToken: String
) {
  listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      type
      email
      phonenumber
      photo
    }
    nextToken
  }
}
`;
