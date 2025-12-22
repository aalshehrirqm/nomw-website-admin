import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

class GuideStep {
  @Prop({ required: true })
  order: number;

  @Prop({ type: TranslatedText, required: true })
  title: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  description: TranslatedText;
}

@Schema({ timestamps: true, versionKey: false })
export class ComplaintGuide extends Document {
  @Prop({ type: TranslatedText, required: true })
  title: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  content: TranslatedText;

  @Prop({ type: [GuideStep], default: [] })
  steps: GuideStep[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const ComplaintGuideSchema =
  SchemaFactory.createForClass(ComplaintGuide);
