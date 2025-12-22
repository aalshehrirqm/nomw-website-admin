import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class ActivityLog extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  entityType: string;

  @Prop({ type: Types.ObjectId })
  entityId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.Mixed })
  changes: any;

  @Prop()
  ipAddress: string;

  @Prop()
  userAgent: string;
}

export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);

// Indexes
ActivityLogSchema.index({ userId: 1, createdAt: -1 });
ActivityLogSchema.index({ entityType: 1, entityId: 1 });
ActivityLogSchema.index({ createdAt: -1 });
