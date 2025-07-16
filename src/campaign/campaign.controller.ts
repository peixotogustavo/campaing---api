import { Controller, Post, Body, UseGuards, Delete } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Get } from '@nestjs/common';
import { Param, Put } from '@nestjs/common';
import { UpdateCampaignDto } from './dto/update-campaign.dto';




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


    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin', 'editor')
    @Get()
    findAllCampaigns() {
        return this.campaignService.findAll();
    }




    @Put(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin', 'editor')
    updateCampaign(
        @Param('id') id: string,
        @Body() body: UpdateCampaignDto,
    ) {
        return this.campaignService.update(id, body);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin') // Somente admin pode deletar
    async deleteCampaign(@Param('id') id: string) {
        await this.campaignService.delete(id);
        return { message: 'Campanha deletada com sucesso' };
    }






}
