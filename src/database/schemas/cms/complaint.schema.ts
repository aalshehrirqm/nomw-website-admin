import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum ComplaintStatus {
  SUBMITTED = 'submitted',
  UNDER_INVESTIGATION = 'under_investigation',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

@Schema({ timestamps: true, versionKey: false })
export class Complaint extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  complaintType: string;

  @Prop({ required: true })
  complaintText: string;

  @Prop({ type: [String], default: [] })
  attachments: string[];

  @Prop({
    type: String,
    enum: ComplaintStatus,
    default: ComplaintStatus.SUBMITTED,
  })
  status: ComplaintStatus;

  @Prop()
  response: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  respondedBy: Types.ObjectId;

  @Prop()
  respondedAt: Date;

  @Prop({ unique: true })
  referenceNumber: string;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);

// Indexes
ComplaintSchema.index({ referenceNumber: 1 });
ComplaintSchema.index({ status: 1, createdAt: -1 });
