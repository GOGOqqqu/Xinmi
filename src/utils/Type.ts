export interface todoType {
  id: string;
  inventory: string;
  content: string;
  remark: string;
  creationDate: string;
  creationTime: string;
  state: boolean;
  grade: number;
  children: Child[];
}

export interface Child {
  content: string;
  state: boolean;
}