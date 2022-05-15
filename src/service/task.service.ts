import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
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

export async function findAndUpdateTask(
	query: FilterQuery<TaskDocument>,
	update: UpdateQuery<TaskDocument>,
	options: QueryOptions
) {
	return TaskModel.findOneAndUpdate(query, update, options);
}

export async function deleteTask(query: FilterQuery<TaskDocument>) {
	return TaskModel.deleteOne(query);
}
