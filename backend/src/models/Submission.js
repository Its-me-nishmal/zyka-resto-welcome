import mongoose, { Schema, Document } from 'mongoose';
const SubmissionSchema = new Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    place: { type: String, required: true },
    favoriteFood: { type: String, required: true },
    visitTime: { type: String, required: true },
    companionType: { type: String, required: true },
    reward: { type: String, required: true },
    deviceId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
export const Submission = mongoose.model('Submission', SubmissionSchema);
//# sourceMappingURL=Submission.js.map