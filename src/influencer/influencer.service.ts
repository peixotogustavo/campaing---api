import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Influencer, InfluencerDocument } from './schemas/influencer.schema';

@Injectable()
export class InfluencerService {
    constructor(
        @InjectModel(Influencer.name)
        private influencerModel: Model<InfluencerDocument>,
    ) { }

    async create(data: {
        name: string;
        socialnetwork: string;
        followers: number;
    }): Promise<Influencer> {
        const created = new this.influencerModel(data);
        return created.save();
    }

    async findAll(filters: {
        name?: string;
        socialnetwork?: string;
    }): Promise<Influencer[]> {
        const query: any = {};

        if (filters.name) {
            query.name = { $regex: filters.name, $options: 'i' }; // busca parcial, case-insensitive
        }

        if (filters.socialnetwork) {
            query.socialnetwork = { $regex: filters.socialnetwork, $options: 'i' };
        }

        return this.influencerModel.find(query).exec();
    }

    async update(id: string, data: {
        name?: string;
        socialnetwork?: string;
        followers?: number;
    }): Promise<Influencer | null> {
        return this.influencerModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<Influencer | null> {
        return this.influencerModel.findByIdAndDelete(id).exec();
    }



}
