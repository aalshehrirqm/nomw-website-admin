import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class NewsletterSubscription extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  subscribedAt: Date;

  @Prop()
  unsubscribedAt: Date;

  @Prop()
  source: string;
}

export const NewsletterSubscriptionSchema = SchemaFactory.createForClass(
  NewsletterSubscription,
);

// Indexes
NewsletterSubscriptionSchema.index({ email: 1 });
NewsletterSubscriptionSchema.index({ isActive: 1 });
