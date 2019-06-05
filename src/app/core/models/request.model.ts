import { Company } from './company.model';
import { Customer } from './customer.model';
import { RequestStatusEnum } from '../../admin/requests/requests.status.enum';

export interface Request {
  id: string;
  fullName: string;
  position: string;
  prospectCompany: Company;
  customer: Customer;
  company: Company;
  requestState: string;
  status: RequestStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
