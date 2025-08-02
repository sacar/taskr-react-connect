import { gql } from '@apollo/client';

export const FIND_ALL_TASKS = gql`
  query FindAllTasks {
    findAllTasks {
      title
      description
      isCompleted
    }
  }
`;

export const FIND_TASK_BY_ID = gql`
  query FindById($id: String!) {
    Task(id: $id) {
      title
      description
      isCompleted
    }
  }
`;