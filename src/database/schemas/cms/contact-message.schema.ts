import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum MessageType {
  COMPLAINT = 'complaint',
  SUGGESTION = 'suggestion',
  INQUIRY = 'inquiry',
  OTHER = 'other',
}

export enum MessageStatus {
  NEW = 'new',
  READ = 'read',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Schema({ timestamps: true, versionKey: false })
export class ContactMessage extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: String, enum: MessageType, required: true })
  messageType: MessageType;

  @Prop({ required: true })
  message: string;

  @Prop({ type: String, enum: MessageStatus, default: MessageStatus.NEW })
  status: MessageStatus;

  @Prop()
  response: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  respondedBy: Types.ObjectId;

  @Prop()
  respondedAt: Date;

  @Prop({ type: String, enum: Priority, default: Priority.MEDIUM })
  priority: Priority;
}

export const ContactMessageSchema =
  SchemaFactory.createForClass(ContactMessage);

// Indexes
ContactMessageSchema.index({ status: 1, createdAt: -1 });
ContactMessageSchema.index({ email: 1 });
