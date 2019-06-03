import {Get, Post, Body, Put, Delete, Query, Param, Controller} from '@nestjs/common';
import { Request } from 'express';
import { RequestService } from './request.service';
import { CreateCompanyDto } from './dto';
import { User } from '../user/user.decorator';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('company')
@Controller('company')
export class RequestController {

  constructor(private readonly requestService: RequestService) {}

  @ApiOperation({ title: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Return all companies.'})
  @Get()
  async findAll(@Query() query): Promise<RequestInterface[]> {
    return await this.requestService.findAll(query);
  }

  @ApiOperation({ title: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Return one company.'})
  @Get(':id')
  async findOne(@Param('id') id): Promise<any> {
    return await this.requestService.findOne({id});
  }

  @ApiOperation({ title: 'Create company' })
  @ApiResponse({ status: 201, description: 'The company has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@User('id') userId: number, @Body('company') comapanyData: CreateCompanyDto) {
    return this.requestService.create(userId, comapanyData);
  }

  @ApiOperation({ title: 'Update company' })
  @ApiResponse({ status: 201, description: 'The company has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async update(@Param() params, @Body('company') comapanyData: CreateCompanyDto) {
    // Todo: update id also when title gets changed
    return this.requestService.update(params.id, comapanyData);
  }

  @ApiOperation({ title: 'Delete company' })
  @ApiResponse({ status: 201, description: 'The company has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async delete(@Param() params) {
    return this.requestService.delete(params.id);
  }
}
