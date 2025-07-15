import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Campaign extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Influencer' }] })
    influencers: Types.ObjectId[];
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
