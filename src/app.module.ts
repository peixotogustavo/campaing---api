import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { InfluencerModule } from './influencer/influencer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/campaign'),
    AuthModule,
    InfluencerModule,
  ],
})
export class AppModule { }
