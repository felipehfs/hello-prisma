interface Task {
  id?: number
  createdAt?: Date
  finished?:  boolean
  title: string
  authorId: number
};

export default Task;
