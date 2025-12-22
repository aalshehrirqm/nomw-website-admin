import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

@Schema({ timestamps: true, versionKey: false })
export class GovernanceDocument extends Document {
  @Prop({ type: TranslatedText, required: true })
  title: TranslatedText;

  @Prop({ type: TranslatedText })
  description: TranslatedText;

  @Prop({ required: true })
  documentType: string;

  @Prop({ required: true })
  fileUrl: string;

  @Prop({ required: true })
  publishDate: Date;

  @Prop()
  version: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const GovernanceDocumentSchema =
  SchemaFactory.createForClass(GovernanceDocument);
