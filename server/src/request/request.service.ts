import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { RequestEntity } from './request.entity';
import { UserEntity } from '../user/user.entity';
import { CustomerService } from '../customer/customer.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UserRO } from '../user/dto/user.ro';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(RequestEntity)
        private readonly requestRepository: Repository<RequestEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly customerService: CustomerService,
    ) {
    }

    async findAll(): Promise<any> {

        const requests = await this.requestRepository.find();
            // .createQueryBuilder('company')

        // qb.where("1 = 1");
        //
        // if ('tag' in query) {
        //     qb.andWhere("company.tagList LIKE :tag", {tag: `%${query.tag}%`});
        // }
        //
        // if ('author' in query) {
        //     const author = await this.userRepository.findOne({username: query.author});
        //     qb.andWhere("company.authorId = :id", {id: author.id});
        // }
        //
        // if ('favorited' in query) {
        //     const author = await this.userRepository.findOne({username: query.favorited});
        //     const ids = author.favorites.map(el => el.id);
        //     qb.andWhere("company.authorId IN (:ids)", {ids});
        // }
        //
        // qb.orderBy('company.created', 'DESC');
        //
        // const companyCount = await qb.getCount();
        //
        // if ('limit' in query) {
        //     qb.limit(query.limit);
        // }
        //
        // if ('offset' in query) {
        //     qb.offset(query.offset);
        // }

        // const requests = await qb.getMany();

        return {requests, requestsCount: requests.length};
    }

    async findOne(where): Promise<any> {
        return await this.requestRepository.findOne(where);
    }

    async create(user: UserRO, requestData: CreateRequestDto): Promise<RequestEntity> {

        let request = new RequestEntity();
        request.fullName = requestData.fullName;
        request.companyName = requestData.companyName;
        request.companyDetails = requestData.companyDetails;
        request.email = requestData.email;
        request.status = '';
        // request.customer = await this.customerService.findOne(requestData.customerId);
        request.requestState = '';

        return await this.requestRepository.save(request);

    }

    async update(id: string, requestsData: any): Promise<any> {
        let toUpdate = await this.requestRepository.findOne({id});
        let updated = Object.assign(toUpdate, requestsData);
        return await this.requestRepository.save(updated);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.requestRepository.delete({id});
    }
}
