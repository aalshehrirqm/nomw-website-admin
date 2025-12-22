import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

@Schema({ timestamps: true, versionKey: false })
export class InvestorRight extends Document {
  @Prop({ type: TranslatedText, required: true })
  name: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  description: TranslatedText;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: true, default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const InvestorRightSchema = SchemaFactory.createForClass(InvestorRight);
