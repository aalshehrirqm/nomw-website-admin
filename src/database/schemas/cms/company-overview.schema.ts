import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

@Schema({ timestamps: true, versionKey: false })
export class CompanyOverview extends Document {
  @Prop({ type: TranslatedText, required: true })
  title: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  content: TranslatedText;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;
}

export const CompanyOverviewSchema =
  SchemaFactory.createForClass(CompanyOverview);
