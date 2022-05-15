import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { UserDocument } from './User.model';

const nanoid = customAlphabet('xyz0123456789', 8);

export interface TaskDocument extends mongoose.Document {
	user: UserDocument['_id'];
	title: string;
	description: string;
	duedate: Date;
	reminderDate: Date;
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

const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);

export default TaskModel;
