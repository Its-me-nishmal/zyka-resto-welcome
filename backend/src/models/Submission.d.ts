import mongoose, { Document } from 'mongoose';
export interface ISubmission extends Document {
    name: string;
    mobile: string;
    place: string;
    favoriteFood: string;
    visitTime: string;
    companionType: string;
    reward: string;
    deviceId: string;
    createdAt: Date;
}
export declare const Submission: mongoose.Model<ISubmission, {}, {}, {}, mongoose.Document<unknown, {}, ISubmission, {}, mongoose.DefaultSchemaOptions> & ISubmission & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ISubmission>;
//# sourceMappingURL=Submission.d.ts.map