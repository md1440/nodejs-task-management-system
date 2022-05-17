import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import TaskModel, { TaskDocument } from '../models/Task.model';
import { databaseResponseTimeHistogram } from '../utils/appmetrics';

export async function createTask(
	input: DocumentDefinition<
		Omit<TaskDocument, 'createdAt' | 'updatedAt' | 'taskId' | 'isCompleted'>
	>
) {
	const metricsLabels = { operation: 'createTask' };
	const timer = databaseResponseTimeHistogram.startTimer();

	try {
		const result = TaskModel.create(input);
		timer({ ...metricsLabels, success: 'true' });

		return result;
	} catch (err: any) {
		timer({ ...metricsLabels, success: 'false' });
		throw new Error(err.message);
	}
}

export async function findTask(
	query: FilterQuery<TaskDocument>,
	options: QueryOptions = { lean: true }
) {
	const metricsLabels = { operation: 'findTask' };
	const timer = databaseResponseTimeHistogram.startTimer();

	try {
		const result = TaskModel.findOne(query, {}, options);
		timer({ ...metricsLabels, success: 'true' });

		return result;
	} catch (err: any) {
		timer({ ...metricsLabels, success: 'false' });
		throw new Error(err.message);
	}
}

export async function findAndUpdateTask(
	query: FilterQuery<TaskDocument>,
	update: UpdateQuery<TaskDocument>,
	options: QueryOptions
) {
	const metricsLabels = { operation: 'findTask' };
	const timer = databaseResponseTimeHistogram.startTimer();

	try {
		const result = TaskModel.findOneAndUpdate(query, update, options);
		timer({ ...metricsLabels, success: 'true' });

		return result;
	} catch (err: any) {
		timer({ ...metricsLabels, success: 'false' });
		throw new Error(err.message);
	}
}

export async function deleteTask(query: FilterQuery<TaskDocument>) {
	return TaskModel.deleteOne(query);
}
