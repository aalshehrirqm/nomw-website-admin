import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

@Schema({ timestamps: true, versionKey: false })
export class LegalConsultation extends Document {
  @Prop({ type: TranslatedText, required: true })
  title: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  description: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  content: TranslatedText;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  publishDate: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const LegalConsultationSchema =
  SchemaFactory.createForClass(LegalConsultation);
