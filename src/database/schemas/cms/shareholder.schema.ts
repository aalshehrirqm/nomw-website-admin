import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

@Schema({ timestamps: true, versionKey: false })
export class Shareholder extends Document {
  @Prop({ type: TranslatedText, required: true })
  name: TranslatedText;

  @Prop({ required: true })
  percentage: number;

  @Prop({ type: TranslatedText })
  description: TranslatedText;

  @Prop()
  logo: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const ShareholderSchema = SchemaFactory.createForClass(Shareholder);
