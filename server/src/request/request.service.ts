import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult, ObjectIdColumn, Column } from 'typeorm';
import { RequestEntity } from './request.entity';
import { RequestDto } from './dto/request.dto';
import { UserEntity } from '../user/user.entity';
import { CustomerEntity } from '../customer/customer.entity';
import { CustomerService } from '../customer/customer.service';

const slug = require('slug');

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly customerService: CustomerService,
  ) {}

  async findAll(query): Promise<any> {

    const qb = await getRepository(RequestEntity)
      .createQueryBuilder('company')

    qb.where("1 = 1");

    if ('tag' in query) {
      qb.andWhere("company.tagList LIKE :tag", { tag: `%${query.tag}%` });
    }

    if ('author' in query) {
      const author = await this.userRepository.findOne({username: query.author});
      qb.andWhere("company.authorId = :id", { id: author.id });
    }

    if ('favorited' in query) {
      const author = await this.userRepository.findOne({username: query.favorited});
      const ids = author.favorites.map(el => el.id);
      qb.andWhere("company.authorId IN (:ids)", { ids });
    }

    qb.orderBy('company.created', 'DESC');

    const companyCount = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const companies = await qb.getMany();

    return {companies, companyCount};
  }

  async findOne(where): Promise<any> {
    const company = await this.requestRepository.findOne(where);
    return {company};
  }

  async create(userId: number, requestData: RequestDto): Promise<RequestEntity> {

    let request = new RequestEntity();
    request.fullName = requestData.fullName;

    request.companyName = requestData.companyName;

    request.companyDetails = requestData.companyDetails;
    request.email = requestData.email;

    request.status = requestData.status;

    request.customer = await this.customerService.findOne(requestData.customerId);

    request.requestState = requestData.requestState;

    return await this.requestRepository.save(request);

  }

  async update(id: string, companyData: any): Promise<any> {
    let toUpdate = await this.requestRepository.findOne({ slug: slug});
    let updated = Object.assign(toUpdate, companyData);
    const company = await this.requestRepository.save(updated);
    return {company};
  }

  async delete(slug: string): Promise<DeleteResult> {
    return await this.requestRepository.delete({ slug: slug});
  }

  slugify(title: string) {
    return slug(title, {lower: true}) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
  }
}
