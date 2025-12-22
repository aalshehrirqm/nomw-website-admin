import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

@Schema({ timestamps: true, versionKey: false })
export class LegalConsultationSection extends Document {
  @Prop({ type: TranslatedText, required: true })
  heroTitle: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  heroDescription: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  heroSubtitle: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  buttonText: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  listTitle: TranslatedText;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const LegalConsultationSectionSchema = SchemaFactory.createForClass(
  LegalConsultationSection,
);
