import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Award extends Document {
  @Prop({ required: true })
  image: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

import { transformUrl } from '../../../common/helpers/url.helper';

export const AwardSchema = SchemaFactory.createForClass(Award);

AwardSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (ret.image) {
      ret.image = transformUrl(ret.image);
    }
    return ret;
  },
});
