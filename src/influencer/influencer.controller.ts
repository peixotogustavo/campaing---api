import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { InfluencerService } from './influencer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Get, Query } from '@nestjs/common';
import { Param, Put } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';


@UseGuards(JwtAuthGuard)
@Controller('influencers')
export class InfluencerController {
    constructor(private readonly influencerService: InfluencerService) { }

    @Post()
    @UseGuards(RolesGuard)
    @Roles('admin', 'editor')
    createInfluencer(@Body() body: {
        name: string;
        socialnetwork: string;
        followers: number;
    }) {
        return this.influencerService.create(body);
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles('admin', 'editor')
    findAll(
        @Query('name') name?: string,
        @Query('socialnetwork') socialnetwork?: string,
    ) {
        return this.influencerService.findAll({ name, socialnetwork });
    }

    @Put(':id')
    @UseGuards(RolesGuard)
    @Roles('admin', 'editor')
    updateInfluencer(
        @Param('id') id: string,
        @Body() body: {
            name?: string;
            socialnetwork?: string;
            followers?: number;
        }
    ) {
        return this.influencerService.update(id, body);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles('admin')
    deleteInfluencer(@Param('id') id: string) {
        return this.influencerService.delete(id);
    }
}
