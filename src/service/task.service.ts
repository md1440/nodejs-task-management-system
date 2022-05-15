import { DocumentDefinition } from 'mongoose';
import TaskModel, { TaskDocument } from '../models/Task.model';

export async function createTask(
	input: DocumentDefinition<Omit<TaskDocument, 'createdAt' | 'updatedAt' | 'userId'>>
) {
	return TaskModel.create(input);
}
