import { DocumentDefinition } from 'mongoose';
import TaskModel, { TaskDocument } from '../models/Task.model';

export async function createTask(
	input: DocumentDefinition<Omit<TaskDocument, 'createdAt' | 'updatedAt' | 'taskId' | 'isCompleted'>>
) {
	return TaskModel.create(input);
}
