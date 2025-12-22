import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum ApplicationStatus {
  NEW = 'new',
  UNDER_REVIEW = 'under_review',
  SHORTLISTED = 'shortlisted',
  REJECTED = 'rejected',
  HIRED = 'hired',
}

@Schema({ timestamps: true, versionKey: false })
export class RecruitmentApplication extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ required: true })
  cvFileUrl: string;

  @Prop({ required: true })
  cvFileName: string;

  @Prop()
  position: string;

  @Prop()
  experience: number;

  @Prop({
    type: String,
    enum: ApplicationStatus,
    default: ApplicationStatus.NEW,
  })
  status: ApplicationStatus;

  @Prop()
  notes: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  reviewedBy: Types.ObjectId;

  @Prop()
  reviewedAt: Date;
}

export const RecruitmentApplicationSchema = SchemaFactory.createForClass(
  RecruitmentApplication,
);

// Indexes
RecruitmentApplicationSchema.index({ status: 1, createdAt: -1 });
RecruitmentApplicationSchema.index({ email: 1 });
