import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export enum SettingType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  JSON = 'json',
}

@Schema({ timestamps: true, versionKey: false })
export class SiteSetting extends Document {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  value: any;

  @Prop({ type: String, enum: SettingType, required: true })
  type: SettingType;

  @Prop({ required: true })
  category: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
}

export const SiteSettingSchema = SchemaFactory.createForClass(SiteSetting);

// Indexes
SiteSettingSchema.index({ key: 1 });
SiteSettingSchema.index({ category: 1 });
