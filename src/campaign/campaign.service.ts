import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign } from './campaign.schema';
import { Model } from 'mongoose';

@Injectable()
export class CampaignService {
    constructor(
        @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
    ) { }

    async create(data: {
        title: string;
        startDate: Date;
        endDate: Date;
        influencers: string[];
    }): Promise<Campaign> {
        const campaign = new this.campaignModel(data);
        return campaign.save();
    }
}
