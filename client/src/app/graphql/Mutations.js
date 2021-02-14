import {gql} from '@apollo/client';

export const LOGIN = gql`
  mutation login(
    $email: String! 
    $password: String!
    ) {
      authenticate(email: $email password: $password)
    }
`;

export const REGISTER = gql`
  mutation signUp(
    $email: String! 
    $password: String!
    ) {
      register(email: $email password: $password)
      authenticate(email: $email password: $password)
    }
`;

export const CREATE_ARTICLE = gql`
  mutation createArticle(
    $title: String!
    $content: String
    $image: String 
    ) {
      addPost(
        post: {
          title: $title
          content: $content
          image: $image
        }
      ) {
        id
        title
        content
        image
        createdAt
        comments {
          id
          postId
          content
          createdAt
        }
       }
    }
`;

export const UPDATE_ARTICLE = gql`
  mutation updateArticle(
    $id: Int!
    $title: String!
    $content: String
    $image: String 
    ) {
      updatePost(
        post: {
          id: $id
          title: $title
          content: $content
          image: $image
        }
      ) {
        id
        title
        content
        image
        createdAt
        comments {
          id
          postId
          content
          createdAt
        }
       }
    }
`;

export const CREATE_COMMENT = gql`
  mutation createComment(
    $postId: Int! 
    $content: String!
    ) {
      addComment(
        postId: $postId 
        content: $content
      ) {
        id
        postId
        content
        createdAt
       }
    }
`;