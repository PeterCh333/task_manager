export interface BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task extends BaseModel {
  title: string;
  description: string;
  deadline: string;
  status: string,
  createdByUserId: string
}

export interface User extends BaseModel {
  name: string;
}