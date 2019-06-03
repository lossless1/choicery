import {Get, Post, Body, Put, Delete, Param, Controller} from '@nestjs/common';
import { RequestService } from './request.service';
import { User } from '../user/user.decorator';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateRequestDto } from './dto/create-request.dto';
import { UserRO } from '../user/dto/user.ro';
import { RequestInterface } from './request.interface';

@ApiBearerAuth()
@ApiUseTags('requests')
@Controller('requests')
export class RequestController {

  constructor(private readonly requestService: RequestService) {}

  @ApiOperation({ title: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Return all companies.'})
  @Get()
  async findAll(): Promise<RequestInterface[]> {
    return await this.requestService.findAll();
  }

  @ApiOperation({ title: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Return one request.'})
  @Get(':id')
  async findOne(@Param('id') id): Promise<any> {
    return await this.requestService.findOne({id});
  }

  @ApiOperation({ title: 'Create request' })
  @ApiResponse({ status: 201, description: 'The request has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@User() user: UserRO, @Body('request') requestData: CreateRequestDto) {
    return this.requestService.create(user, requestData);
  }

  @ApiOperation({ title: 'Update request' })
  @ApiResponse({ status: 201, description: 'The request has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async update(@Param() params, @Body('request') requestData: CreateRequestDto) {
    return this.requestService.update(params.id, requestData);
  }

  @ApiOperation({ title: 'Delete request' })
  @ApiResponse({ status: 201, description: 'The request has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async delete(@Param() params, @User() user: UserRO) {
    return this.requestService.delete(params.id);
  }
}
