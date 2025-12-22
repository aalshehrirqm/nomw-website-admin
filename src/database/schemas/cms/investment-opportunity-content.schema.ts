import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum OpportunityContentType {
    HERO = 'hero',
    STRATEGIC_WORK_TITLE = 'strategic_work_title',
    STRATEGIC_WORK = 'strategic_work',
    EXPERIENCE_TITLE = 'experience_title',
    EXPERIENCE = 'experience',
}

@Schema({ timestamps: true })
export class InvestmentOpportunityContent extends Document {
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
            ar: { type: String, required: true },
            en: { type: String, required: true },
        },
        required: true,
    })
    description: {
        ar: string;
        en: string;
    };

    @Prop({
        type: String,
        enum: Object.values(OpportunityContentType),
        required: true,
    })
    type: OpportunityContentType;

    @Prop()
    image?: string;

    @Prop({ default: 0 })
    order: number;

    @Prop({ default: true })
    isActive: boolean;
}

import { transformUrl } from '../../../common/helpers/url.helper';

export const InvestmentOpportunityContentSchema = SchemaFactory.createForClass(InvestmentOpportunityContent);

// Transform image to full URL when converting to JSON
InvestmentOpportunityContentSchema.set('toJSON', {
    transform: function (doc, ret) {
        if (ret.image) {
            ret.image = transformUrl(ret.image);
        }
        return ret;
    },
});
