import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

class SubService {
  @Prop({ required: false })
  serviceId: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ type: TranslatedText, required: true })
  title: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  description: TranslatedText;

  @Prop({ type: [TranslatedText], default: [] })
  types: TranslatedText[];

  @Prop({ type: [TranslatedText], default: [] })
  items: TranslatedText[];
}

@Schema({ timestamps: true, versionKey: false })
export class Service extends Document {
  @Prop({ required: false })
  serviceId: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ type: TranslatedText, required: true })
  title: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  description: TranslatedText;

  @Prop({ type: [TranslatedText], default: [] })
  types: TranslatedText[];

  @Prop({ type: [TranslatedText], default: [] })
  items: TranslatedText[];

  @Prop({ default: false })
  hasSubServices: boolean;

  @Prop({ type: [SubService], default: [] })
  subServices: SubService[];

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
