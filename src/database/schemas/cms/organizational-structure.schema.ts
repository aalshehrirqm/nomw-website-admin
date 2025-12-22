import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

@Schema({ timestamps: true, versionKey: false })
export class OrganizationalStructure extends Document {
  @Prop({ type: TranslatedText, required: true })
  title: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  subtitle: TranslatedText;

  @Prop({ required: true })
  image_ar: string;

  @Prop({ required: true })
  image_en: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

import { transformUrl } from '../../../common/helpers/url.helper';

export const OrganizationalStructureSchema = SchemaFactory.createForClass(
  OrganizationalStructure,
);

// Transform images to full URLs
OrganizationalStructureSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (ret.image_ar) ret.image_ar = transformUrl(ret.image_ar);
    if (ret.image_en) ret.image_en = transformUrl(ret.image_en);

    return ret;
  },
});
