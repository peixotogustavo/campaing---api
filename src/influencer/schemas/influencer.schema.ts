import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InfluencerDocument = Influencer & Document;

@Schema()
export class Influencer {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    socialnetwork: string;

    @Prop({ required: true })
    followers: number;
}

export const InfluencerSchema = SchemaFactory.createForClass(Influencer);
