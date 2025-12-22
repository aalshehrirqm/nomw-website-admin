import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

@Schema({ timestamps: true, versionKey: false })
export class InvestorsRightsSection extends Document {
  @Prop({ type: TranslatedText, required: true })
  title: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  subtitle: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  ctaTitle: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  ctaButton: TranslatedText;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const InvestorsRightsSectionSchema = SchemaFactory.createForClass(
  InvestorsRightsSection,
);
