import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

import { transformUrl } from '../../../common/helpers/url.helper';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class ManagementTeam extends Document {
  @Prop({ type: TranslatedText, required: true })
  name: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  position: TranslatedText;

  @Prop({ type: TranslatedText, required: true })
  bio: TranslatedText;

  @Prop({ required: true })
  image: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const ManagementTeamSchema =
  SchemaFactory.createForClass(ManagementTeam);

ManagementTeamSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (ret.image) {
      ret.image = transformUrl(ret.image);
    }
    return ret;
  },
});
