import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { Comment } from './comment.entity';
import { UserEntity } from '../user/user.entity';
import { FollowsEntity } from '../profile/follows.entity';
import { CreateCompanyDto } from './dto';

const slug = require('slug');

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(ComapanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async findAll(query): Promise<any> {

    const qb = await getRepository(CompanyEntity)
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
    const company = await this.companyRepository.findOne(where);
    return {company};
  }

  async create(userId: number, companyData: CreateCompanyDto): Promise<CompanyEntity> {

    let company = new CompanyEntity();
    company.title = companyData.title;
    company.description = companyData.description;
    company.slug = this.slugify(companyData.title);
    company.tagList = companyData.tagList || [];
    company.comments = [];

    const newCompany = await this.companyRepository.save(company);

    return newCompany;

  }

  async update(id: string, companyData: any): Promise<any> {
    let toUpdate = await this.companyRepository.findOne({ slug: slug});
    let updated = Object.assign(toUpdate, companyData);
    const company = await this.companyRepository.save(updated);
    return {company};
  }

  async delete(slug: string): Promise<DeleteResult> {
    return await this.companyRepository.delete({ slug: slug});
  }

  slugify(title: string) {
    return slug(title, {lower: true}) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
  }
}
