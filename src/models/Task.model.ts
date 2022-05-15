import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { UserDocument } from './User.model';

const nanoid = customAlphabet('xyz0123456789', 8);

export interface TaskDocument extends mongoose.Document {
	user: UserDocument['_id'];
	taskId: string;
	title: string;
	description: string;
	dueDate: string | Date;
	reminderDate: string | Date;
	isCompleted: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const taskSchema = new mongoose.Schema(
	{
		taskId: {
			type: String,
			required: true,
			unique: true,
			default: () => `task_${nanoid()}`,
		},
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		title: { type: String, required: true },
		description: { type: String, required: true },
		dueDate: { type: Date, required: true },
		reminderDate: { type: Date, required: true },
		isCompleted: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

taskSchema.pre('save', async function (next) {
	const task = this as TaskDocument;

	const dueDate = new Date(String(task.dueDate));
	const reminderDate = new Date(String(task.reminderDate));

	task.dueDate = dueDate;
	task.reminderDate = reminderDate;

	return next();
});

const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);

export default TaskModel;
