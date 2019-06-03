import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/create.customer.dto';

const slug = require('slug');

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(query): Promise<any> {

    const qb = await getRepository(CustomerEntity)
      .createQueryBuilder('customer')

    qb.where("1 = 1");

    if ('tag' in query) {
      qb.andWhere("customer.tagList LIKE :tag", { tag: `%${query.tag}%` });
    }

    if ('author' in query) {
      const author = await this.userRepository.findOne({username: query.author});
      qb.andWhere("customer.authorId = :id", { id: author.id });
    }

    if ('favorited' in query) {
      const author = await this.userRepository.findOne({username: query.favorited});
      const ids = author.favorites.map(el => el.id);
      qb.andWhere("customer.authorId IN (:ids)", { ids });
    }

    qb.orderBy('customer.created', 'DESC');

    const customerCount = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const companies = await qb.getMany();

    return {companies, customerCount};
  }

  async findOne(id): Promise<CustomerEntity> {
    return await this.customerRepository.findOne(id);
  }

  async create(userId: number, customerData: CreateCustomerDto): Promise<CustomerEntity> {

    let customer = new CustomerEntity();
    customer.title = customerData.title;
    customer.description = customerData.description;
    customer.slug = this.slugify(customerData.title);
    customer.tagList = customerData.tagList || [];
    customer.comments = [];

    return await this.customerRepository.save(customer);
  }

  async update(id: string, customerData: any): Promise<any> {
    let toUpdate = await this.customerRepository.findOne({ slug: slug});
    let updated = Object.assign(toUpdate, customerData);
    return await this.customerRepository.save(updated);
  }

  async delete(slug: string): Promise<DeleteResult> {
    return await this.customerRepository.delete({slug});
  }

  slugify(title: string) {
    return slug(title, {lower: true}) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
  }
}
