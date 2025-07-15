import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('campaigns')
export class CampaignController {
    constructor(private readonly campaignService: CampaignService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin', 'editor')
    createCampaign(@Body() body: {
        title: string;
        startDate: Date;
        endDate: Date;
        influencers: string[];
    }) {
        return this.campaignService.create(body);
    }

}
