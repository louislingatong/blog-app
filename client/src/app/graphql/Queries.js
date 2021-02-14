import {gql} from '@apollo/client';

export const LOAD_ARTICLES = gql`
  query Post(
    $limit: Int
    ) {
      posts(pagination: {limit: $limit}) {
        id
        image
        createdAt
        title
      }
    }
`;

export const LOAD_ARTICLE_DETAILS = gql`
  query Post(
    $id: Int 
    ) {
      post(id: $id) {
        id
        image
        createdAt
        title
        content
        comments {
          id
          postId
          content
          createdAt
        }
      }
    }
`;