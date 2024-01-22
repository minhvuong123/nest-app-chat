export type CreateUserDetails = {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
};

export type UserCredentialDetails = {
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
}>;
