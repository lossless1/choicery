import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestService } from './request.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { RequestEntity } from './request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEntity])],
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
        {path: 'companies/:id', method: RequestMethod.PUT});
  }
}
