import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

@Schema({ timestamps: true, versionKey: false })
export class CeoWords extends Document {
  @Prop({ type: TranslatedText, required: true })
  title: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  name: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  position: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  message: TranslatedText;

  @Prop({ required: false })
  image: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

import { transformUrl } from '../../../common/helpers/url.helper';

export const CeoWordsSchema = SchemaFactory.createForClass(CeoWords);

CeoWordsSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (ret.image) {
      ret.image = transformUrl(ret.image);
    }
    return ret;
  },
});
