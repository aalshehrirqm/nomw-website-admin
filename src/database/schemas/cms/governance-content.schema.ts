import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum GovernanceContentType {
    HERO = 'hero',
    PILLARS_TITLE = 'pillars_title',
    PILLAR = 'pillar',
    COMMITMENT = 'commitment',
    SECTION = 'section',
}

@Schema({ timestamps: true })
export class GovernanceContent extends Document {
    @Prop({
        type: {
            ar: { type: String, required: true },
            en: { type: String, required: true },
        },
        required: true,
    })
    title: {
        ar: string;
        en: string;
    };

    @Prop({
        type: {
            ar: { type: String },
            en: { type: String },
        },
    })
    description?: {
        ar: string;
        en: string;
    };

    @Prop({
        type: String,
        enum: Object.values(GovernanceContentType),
        required: true,
    })
    type: GovernanceContentType;

    @Prop()
    icon?: string;

    @Prop({ type: [{ ar: String, en: String }] })
    list?: { ar: string; en: string }[];

    @Prop({
        type: {
            ar: { type: String },
            en: { type: String },
        },
    })
    footer?: {
        ar: string;
        en: string;
    };

    @Prop({ default: 0 })
    order: number;

    @Prop({ default: true })
    isActive: boolean;
}

export const GovernanceContentSchema = SchemaFactory.createForClass(GovernanceContent);
