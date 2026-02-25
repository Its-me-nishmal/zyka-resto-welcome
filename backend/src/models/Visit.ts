import mongoose, { Schema, Document } from 'mongoose';

export interface IVisit extends Document {
    source: string;
    deviceId: string;
    createdAt: Date;
}

const VisitSchema: Schema = new Schema({
    source: { type: String, default: 'direct' },
    deviceId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Visit = mongoose.model<IVisit>('Visit', VisitSchema);
