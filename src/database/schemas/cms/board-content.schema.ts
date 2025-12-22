import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum BoardContentType {
    HERO = 'hero',
    MISSION_TITLE = 'mission_title',
    MISSION_ITEM = 'mission_item',
    MISSION_CLOSING = 'mission_closing',
    MEMBERS_SECTION = 'members_section',
    MEMBER = 'member',
    COMMITTEES_SECTION = 'committees_section',
    COMMITTEE = 'committee',
}

@Schema({ timestamps: true })
export class BoardContent extends Document {
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
        type: {
            ar: { type: String },
            en: { type: String },
        },
    })
    position?: {
        ar: string;
        en: string;
    };

    @Prop({
        type: String,
        enum: Object.values(BoardContentType),
        required: true,
    })
    type: BoardContentType;

    @Prop()
    icon?: string;

    @Prop()
    image?: string;

    @Prop({ default: 0 })
    order: number;

    @Prop({ default: true })
    isActive: boolean;
}

import { transformUrl } from '../../../common/helpers/url.helper';

export const BoardContentSchema = SchemaFactory.createForClass(BoardContent);

// Transform image to full URL when converting to JSON
BoardContentSchema.set('toJSON', {
    transform: function (doc, ret) {
        if (ret.image) {
            ret.image = transformUrl(ret.image);
        }
        return ret;
    },
});
