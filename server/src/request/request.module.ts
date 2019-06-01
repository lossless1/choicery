import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { Comment } from './comment.entity';
import { UserEntity } from '../user/user.entity';
import { FollowsEntity } from '../profile/follows.entity';
import { RequestService } from './request.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  providers: [RequestService],
  controllers: [
    RequestController
  ]
})
export class RequestModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'companies', method: RequestMethod.GET},
        {path: 'companies', method: RequestMethod.POST},
        {path: 'companies/:id', method: RequestMethod.GET},
        {path: 'companies/:id', method: RequestMethod.DELETE},
        {path: 'companies/:id', method: RequestMethod.PUT},
  }
}
