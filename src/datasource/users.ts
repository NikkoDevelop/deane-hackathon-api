import { DataSourceConfig } from 'apollo-datasource';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import isEmail from 'isemail';
import { UserInputError, ForbiddenError } from 'apollo-server-express';
import { PrismaClient, User } from '@prisma/client';

import { JWT_SECRET } from '../config';
import { Context } from '../graphql/context';

import { createToken } from '../integrations/jwt';

export class UsersAPI {
  private readonly jwtSecret = JWT_SECRET || 'secret';
  private prisma!: PrismaClient;
  private context!: Context;

  public initialize (config: DataSourceConfig<Context>) {
    this.context = config.context;
    this.prisma = config.context.prisma;
  }

  getToken (user: User): string {
    return jwt.sign({
      email: user.email,
      sub: user.id,
    }, this.jwtSecret, {
      expiresIn: '200h',
      algorithm: 'HS256',
    });
  }

  public async findUserByToken (authorization: string): Promise<User | null> {
    if (!authorization) {
      return null;
    }

    try {
      const token: any = jwt.verify(authorization.replace('Bearer ', ''), this.jwtSecret);

      return token?.userId && await this.prisma.user.findFirst({ where: { id: token.userId } });
    } catch (error) {
      return null;
    }
  }

  public async createUser ({ login, email, password }: CreateUserArgs): Promise<CreateUser> {
    const existingUser = await this.prisma.user.findFirst({ where: { OR: [{ email }, { login }] } });
    const bcryptHashNumber = 7;

    if (existingUser) {
      throw new UserInputError('This email is already exist');
    }

    if (!isEmail.validate(email)) {
      throw new UserInputError('Invalid email');
    }

    const hashedPassword = await bcrypt.hash(password, bcryptHashNumber);
    const user = await this.prisma.user.create({
      data: {
        login,
        email,
        password: hashedPassword,
      },
    });

    const token = createToken(user);

    return { token, user };
  }

  async signIn ({ login, password }: SignInUserArgs): Promise<SignInUser> {
    const user = await this.prisma.user.findFirst({ where: { OR: [{ email: login }, { login }] } });

    if (!user || !user.password) {
      throw new ForbiddenError('Incorrect email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new ForbiddenError('Incorrect email or password');
    }

    const token = createToken(user);

    return { token, user };
  }
}

interface CreateUser {
	token: string;
	user: User;
}

interface CreateUserArgs {
	login: string,
	email: string,
	password: string
}

interface SignInUser {
	token: string;
	user: User;
}

interface SignInUserArgs {
	login: string;
	password: string;
}
