import {gql} from '@apollo/client';

export const COMMENT_SUBSCRIPTION = gql`
  subscription {
      newComment {
        id
        postId
        content
        createdAt
      }
    }
`;