// GraphQL Type Definitions
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Task {
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface TaskWithId extends Task {
  id: string;
}

// Input Types
export interface CreateTaskDto {
  title: string;
  description: string;
  isCompleted?: boolean;
}

export interface UpdateTaskInput {
  id: string;
  title?: string;
  description?: string;
  isCompleted?: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  name: string;
}

// Response Types
export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}