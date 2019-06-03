import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from './company.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { CompanyEntity } from './company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  providers: [CompanyService],
  controllers: [
    CompanyController
  ]
})
export class CompanyModule implements NestModule {
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