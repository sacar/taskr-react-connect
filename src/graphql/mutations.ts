import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($createTaskDto: CreateTaskDto!) {
    createTask(createTaskDto: $createTaskDto) {
      title
      description
      isCompleted
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      title
      description
      isCompleted
    }
  }
`;

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      user {
        id
        email
        name
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($signupInput: SignupInput!) {
    signup(signupInput: $signupInput)
  }
`;