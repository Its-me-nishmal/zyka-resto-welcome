import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  name: string;
  mobile: string;
  place: string;
  favoriteFood: string;
  visitTime: string;
  companionType: string;
  reward: string;
  deviceId: string;
  source: string;
  createdAt: Date;
}

const SubmissionSchema: Schema = new Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  place: { type: String, required: true },
  favoriteFood: { type: String, required: true },
  visitTime: { type: String, required: true },
  companionType: { type: String, required: true },
  reward: { type: String, required: true },
  deviceId: { type: String, required: true },
  source: { type: String, default: 'direct' },
  createdAt: { type: Date, default: Date.now },
});

export const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);
