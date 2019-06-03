import { CustomerEntity } from '../customer/customer.entity';

export interface RequestInterface {
  id: string;
  fullName: string;
  companyName: string;
  companyDetails: string;
  email: string;
  status: string;
  customer: CustomerEntity;
  requestState: string;
  createdAt: Date;
  updatedAt?: Date;
}
