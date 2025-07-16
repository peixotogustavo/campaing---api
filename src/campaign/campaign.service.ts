import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign } from './campaign.schema';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

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

    /*    async findAll(): Promise<Campaign[]> {
            return this.campaignModel.find().populate('influencers').exec();
        }
    */

    async findAll(): Promise<Campaign[]> {
        return this.campaignModel.find().populate('influencers').exec();
    }

    async update(id: string, data: UpdateCampaignDto): Promise<Campaign | null> {
        console.log('Recebido para update:', id, data);

        if (data.influencers) {
            data.influencers = data.influencers.map(
                (id) => new mongoose.Types.ObjectId(id),
            ) as any;
        }

        const updated = await this.campaignModel
            .findByIdAndUpdate(id, data, { new: true })
            .populate('influencers')
            .exec();

        console.log('Resultado do update:', updated);

        if (!updated) {
            throw new NotFoundException('Campanha não encontrada ou não atualizada');
        }

        return updated;
    }

    async delete(id: string): Promise<void> {
        const result = await this.campaignModel.findByIdAndDelete(id).exec();

        if (!result) {
            throw new NotFoundException('Campanha não encontrada');
        }
    }


}
