import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/create.customer.dto';


@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepository: Repository<CustomerEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {
    }

    async findAll(): Promise<any> {

        const customers = await this.customerRepository.find()
        //
        // if ('tag' in query) {
        //   qb.andWhere("customer.tagList LIKE :tag", { tag: `%${query.tag}%` });
        // }
        //
        // if ('author' in query) {
        //   const author = await this.userRepository.findOne({username: query.author});
        //   qb.andWhere("customer.authorId = :id", { id: author.id });
        // }
        //
        // if ('favorited' in query) {
        //   const author = await this.userRepository.findOne({username: query.favorited});
        //   const ids = author.favorites.map(el => el.id);
        //   qb.andWhere("customer.authorId IN (:ids)", { ids });
        // }
        //
        // qb.orderBy('customer.created', 'DESC');
        //
        // const customerCount = await qb.getCount();
        //
        // if ('limit' in query) {
        //   qb.limit(query.limit);
        // }
        //
        // if ('offset' in query) {
        //   qb.offset(query.offset);
        // }
        //
        // const companies = await qb.getMany();

        return {customers, customersCount: customers.length};
    }

    async findOne(id): Promise<CustomerEntity> {
        return await this.customerRepository.findOne(id);
    }

    async create(userId: number, customerData: CreateCustomerDto): Promise<CustomerEntity> {

        let customer = new CustomerEntity();
        customer.description = customerData.description;
        customer.fullName = customerData.fullName;
        customer.email = customerData.email;
        customer.position = customerData.position;
        customer.city = customerData.city;
        customer.country = customerData.country;
        customer.description = customerData.description;

        // TODO Get main company
        // customer.company = customerData.company;
        //TODO Get reference person
        // customer.referencePerson = ReferencePerson;
        customer.contactDetails = customerData.email;
        customer.order = 0;

        return await this.customerRepository.save(customer);
    }

    async update(id: string, customerData: any): Promise<any> {
        let toUpdate = await this.customerRepository.findOne({id});
        let updated = Object.assign(toUpdate, customerData);
        return await this.customerRepository.save(updated);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.customerRepository.delete({id});
    }
}
