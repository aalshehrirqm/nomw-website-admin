import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

@Schema({ timestamps: true, versionKey: false })
export class HeroSection extends Document {
  @Prop({ type: TranslatedText, required: true })
  title: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  subtitle: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  ctaText: TranslatedText;

  @Prop({ required: true })
  ctaLink: string;

  @Prop({ type: TranslatedText })
  scrollDownText: TranslatedText;

  @Prop({ required: true })
  backgroundImage: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  order: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

import { transformUrl } from '../../../common/helpers/url.helper';

export const HeroSectionSchema = SchemaFactory.createForClass(HeroSection);

// Transform backgroundImage to full URL when converting to JSON
HeroSectionSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (ret.backgroundImage) {
      ret.backgroundImage = transformUrl(ret.backgroundImage);
    }
    return ret;
  },
});

HeroSectionSchema.set('toObject', {
  transform: function (doc, ret) {
    if (ret.backgroundImage) {
      ret.backgroundImage = transformUrl(ret.backgroundImage);
    }
    return ret;
  },
});
