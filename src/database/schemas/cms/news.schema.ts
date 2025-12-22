import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

@Schema({ timestamps: true, versionKey: false })
export class News extends Document {
  @Prop({ type: TranslatedText, required: true })
  title: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  excerpt: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  content: TranslatedText;

  @Prop({ required: true })
  image: string;

  @Prop({ type: TranslatedText, required: true })
  category: TranslatedText;

  @Prop({ unique: true, sparse: true })
  slug: string;

  @Prop()
  author: string;

  @Prop({ required: true })
  publishDate: Date;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: 0 })
  views: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

import { transformUrl } from '../../../common/helpers/url.helper';

export const NewsSchema = SchemaFactory.createForClass(News);

NewsSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (ret.image) {
      ret.image = transformUrl(ret.image);
    }
    return ret;
  },
});
NewsSchema.index({ slug: 1 });
NewsSchema.index({ 'category.ar': 1, 'category.en': 1 });
