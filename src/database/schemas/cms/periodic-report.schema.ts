import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class TranslatedText {
  @Prop({ required: true })
  ar: string;

  @Prop({ required: true })
  en: string;
}

export enum ReportType {
  BOARD_REPORT = 'board_report',
  FINANCIAL_STATEMENT = 'financial_statement',
  PILLAR_THREE = 'pillar_three',
}

@Schema({ timestamps: true, versionKey: false })
export class PeriodicReport extends Document {
  @Prop({ type: TranslatedText, required: true })
  title: TranslatedText;

  @Prop({ type: String, enum: ReportType, required: true })
  type: ReportType;

  @Prop({ required: true })
  year: number;

  @Prop()
  quarter: number;

  @Prop()
  fileUrl: string; // Deprecated - for backward compatibility

  @Prop()
  fileUrlAr: string;

  @Prop()
  fileUrlEn: string;

  @Prop()
  thumbnailImage: string;

  @Prop({ default: () => new Date() })
  publishDate: Date;

  @Prop()
  fileSize: number;

  @Prop({ default: 0 })
  downloadCount: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

import { transformUrl } from '../../../common/helpers/url.helper';

export const PeriodicReportSchema =
  SchemaFactory.createForClass(PeriodicReport);

// Transform file URLs to full URLs when converting to JSON
PeriodicReportSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (ret.fileUrl) ret.fileUrl = transformUrl(ret.fileUrl);
    if (ret.fileUrlAr) ret.fileUrlAr = transformUrl(ret.fileUrlAr);
    if (ret.fileUrlEn) ret.fileUrlEn = transformUrl(ret.fileUrlEn);
    if (ret.thumbnailImage) ret.thumbnailImage = transformUrl(ret.thumbnailImage);

    return ret;
  },
});

// Indexes
PeriodicReportSchema.index({ type: 1, year: -1, quarter: -1 });
PeriodicReportSchema.index({ publishDate: -1 });
