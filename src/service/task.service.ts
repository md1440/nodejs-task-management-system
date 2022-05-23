import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import TaskModel, { TaskDocument } from '../models/Task.model';
import { databaseResponseTimeHistogram, withTimer } from '../utils/appmetrics';

export async function createTask(
	input: DocumentDefinition<
		Omit<TaskDocument, 'createdAt' | 'updatedAt' | 'taskId' | 'isCompleted'>
	>
) {
	return withTimer('createTask',
        () => TaskModel.create(input)
    );
}

export async function findTask(
	query: FilterQuery<TaskDocument>,
	options: QueryOptions = { lean: true }
) {
	return withTimer('findTask',
        () => TaskModel.findOne(query, {}, options)
    );
}

export async function findAndUpdateTask(
	query: FilterQuery<TaskDocument>,
	update: UpdateQuery<TaskDocument>,
	options: QueryOptions
) {
	return withTimer('findTask',
        () => TaskModel.findOneAndUpdate(query, update, options)
    );
}

export async function deleteTask(query: FilterQuery<TaskDocument>) {
	return TaskModel.deleteOne(query);
}
