import { DocumentDefinition, FilterQuery, QueryOptions } from 'mongoose';
import TaskModel, { TaskDocument } from '../models/Task.model';

export async function createTask(
	input: DocumentDefinition<
		Omit<TaskDocument, 'createdAt' | 'updatedAt' | 'taskId' | 'isCompleted'>
	>
) {
	return TaskModel.create(input);
}

export async function findTask(
	query: FilterQuery<TaskDocument>,
	options: QueryOptions = { lean: true }
) {
	return TaskModel.findOne(query, {}, options);
}
