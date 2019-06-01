import {Get, Post, Body, Put, Delete, Query, Param, Controller} from '@nestjs/common';
import { Request } from 'express';
import { ComapnyService } from './company.service';
import { CreateCompanyDto } from './dto';
import { CommentsRO } from './company.interface';
import { User } from '../user/user.decorator';
import { CompanyInterface } from './company.interface';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('company')
@Controller('company')
export class CompanyController {

  constructor(private readonly comapanyService: ComapnyService) {}

  @ApiOperation({ title: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Return all companies.'})
  @Get()
  async findAll(@Query() query): Promise<CompanyInterface[]> {
    return await this.comapanyService.findAll(query);
  }

  @ApiOperation({ title: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Return one company.'})
  @Get(':id')
  async findOne(@Param('id') id): Promise<any> {
    return await this.comapanyService.findOne({id});
  }

  @ApiOperation({ title: 'Create company' })
  @ApiResponse({ status: 201, description: 'The company has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@User('id') userId: number, @Body('company') comapanyData: CreateCompanyDto) {
    return this.comapanyService.create(userId, comapanyData);
  }

  @ApiOperation({ title: 'Update company' })
  @ApiResponse({ status: 201, description: 'The company has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async update(@Param() params, @Body('company') comapanyData: CreateCompanyDto) {
    // Todo: update id also when title gets changed
    return this.comapanyService.update(params.id, comapanyData);
  }

  @ApiOperation({ title: 'Delete company' })
  @ApiResponse({ status: 201, description: 'The company has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async delete(@Param() params) {
    return this.comapanyService.delete(params.id);
  }
}