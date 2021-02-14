const { gql } = require('apollo-server');

const typeDefs = gql`
  type Post {
    """
    Id of the post, -1 if not found
    """
    id: Int!
    title: String!
    content: String
    """
    Base64 encoded string of the image file
    """
    image: String
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    """
    Id of the comment, -1 if not found
    """
    id: Int!
    postId: Int!
    content: String!
    createdAt: String
  }

  input PostInput {
    """
    Post id for update
    """
    id: Int
    title: String!
    content: String
    """
    Base64 encoded string of the image file
    """
    image: String
  }

  input Pagination {
    limit: Int
    offset: Int
  }

  type Query {
    post(id: Int): Post
    posts(pagination: Pagination): [Post]!
  }

  type Mutation {
    addComment(postId: Int!, content: String!): Comment
    """
    Requires authorization header token from authenticate mutation
    """
    addPost(post: PostInput): Post
    """
    Requires authorization header token from authenticate mutation
    """
    updatePost(post: PostInput): Post
    """
    Authenticate email and password, returns a token
    """
    authenticate(email: String!, password: String!): String
    """
    Register a user, true if succesful
    """
    register(email: String!, password: String!): Boolean
  }
`;

module.exports = typeDefs;
