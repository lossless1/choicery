interface Company {
  _id: string;
  slug: string;
  name: string;
  host: string;
  description: string;
  avatarUrl: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
