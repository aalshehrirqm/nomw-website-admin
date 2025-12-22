import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Analytics extends Document {
  @Prop({ required: true })
  page: string;

  @Prop({ required: true })
  path: string;

  @Prop({ default: 1 })
  views: number;

  @Prop({ default: 1 })
  uniqueVisitors: number;

  @Prop({ required: true })
  date: Date;

  @Prop()
  referrer: string;

  @Prop()
  userAgent: string;

  @Prop()
  country: string;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);

// Indexes
AnalyticsSchema.index({ page: 1, date: -1 });
AnalyticsSchema.index({ date: -1 });
