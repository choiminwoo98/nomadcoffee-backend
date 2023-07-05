import { gql } from "apollo-server";
export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    password: String!
    avatarURL: String
    githubUsername: String
  }
  type Query {
    user(id: Int!): User
  }
  type Mutation {
    createAccount(
      email: String!
      username: String!
      password: String!
      name: String!
    ): User
  }
`;
