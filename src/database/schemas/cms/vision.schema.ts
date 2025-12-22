import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

class ValueItem {
  @Prop({ type: TranslatedText, required: true })
  text: TranslatedText;
}

@Schema({ timestamps: true, versionKey: false })
export class Vision extends Document {
  // Main Section Title
  @Prop({ type: TranslatedText, required: true })
  sectionTitle: TranslatedText;

  // Vision Section
  @Prop({ type: TranslatedText, required: true })
  visionTitle: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  visionDescription: TranslatedText;

  // Mission Section
  @Prop({ type: TranslatedText, required: true })
  missionTitle: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  missionDescription: TranslatedText;

  // Values Section
  @Prop({ type: TranslatedText, required: true })
  valuesTitle: TranslatedText;

  @Prop({ type: [ValueItem], default: [] })
  values: ValueItem[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const VisionSchema = SchemaFactory.createForClass(Vision);
