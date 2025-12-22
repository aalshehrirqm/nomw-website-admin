import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop()
  ar: string;

  @Prop()
  en: string;
}

class Dimensions {
  @Prop()
  width: number;

  @Prop()
  height: number;
}

@Schema({ timestamps: true, versionKey: false })
export class Media extends Document {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  mimeType: string;

  @Prop({ required: true })
  size: number;

  @Prop({ type: Dimensions })
  dimensions: Dimensions;

  @Prop({ type: TranslatedText })
  alt: TranslatedText;

  @Prop({ required: true })
  category: string;

  @Prop()
  entityType: string;

  @Prop({ type: Types.ObjectId })
  entityId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  uploadedBy: Types.ObjectId;
}

import { transformUrl } from '../../../common/helpers/url.helper';

export const MediaSchema = SchemaFactory.createForClass(Media);

// Transform url to full URL when converting to JSON
MediaSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (ret.url) {
      ret.url = transformUrl(ret.url);
    }
    return ret;
  },
});

// Indexes
MediaSchema.index({ entityType: 1, entityId: 1 });
MediaSchema.index({ uploadedBy: 1, createdAt: -1 });
MediaSchema.index({ category: 1 });
