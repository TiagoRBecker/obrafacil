import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma';
import { UserEntity } from '../entity/user.entity';
import { UserRepositoryInterface } from './user.repository.interface';
import { MapperToPrisma, UserWithContextDto } from './mapper.user.repo';

@Injectable()
export class UserRepo extends UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const created = await this.prisma.account.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.passwordHash,
        role: {
          connect: { name: user.role },
        },
      },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true },
            },
          },
        },
       
      },
    });

    return MapperToPrisma.toDto(created);
  }

  async findByEmail(email: string): Promise<UserWithContextDto | null> {
    
    const user = await this.prisma.account.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true },
            },
          },
        },
      
      },
    });

    if (!user) return null;
    return MapperToPrisma.toDtoContext(user);
  }

  async findById(id: string): Promise<UserWithContextDto | null> {
    const user = await this.prisma.account.findUnique({
      where: { id },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true },
            },
          },
        },
     
      },
    });

    if (!user) return null;
    return MapperToPrisma.toDtoContext(user);
  }
}
