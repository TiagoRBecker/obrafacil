import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../../db/prisma';
import { UserEntity } from '../entity/user.entity';
import { UserRepositoryInterface } from './user.repository.interface';
import { MapperToPrisma, UserPermission } from './mapper.user.repo';

@Injectable()
export class UserRepo extends UserRepositoryInterface {
  private readonly logger = new Logger(UserRepo.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async create(user: UserEntity): Promise<UserEntity> {
    const { email, name, passwordHash, role } = user;
    try {
      const user = await this.prisma.account.create({
        data: {
          email,
          name,
          password: passwordHash,
          role: {
            connect: {
              name: role,
            },
          },
        },
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
         
        },
      });

      const data = MapperToPrisma.toDto(user);

      return data;
    } catch (error) {
      this.logger.error('Erro ao criar usuario no banco', error);
      throw new InternalServerErrorException(
        'Erro de persistência no banco de dados',
      );
    }
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    
    try {
      const user = await this.prisma.account.findUnique({
        where: { email },
        include: {
         
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
              
            },
          }
         
        },
      });
      
      const data = MapperToPrisma.toDto(user as UserPermission);
     

      return data;
    } catch (error) {
      this.logger.error('Erro ao buscar usuario  no banco', error);
      throw new InternalServerErrorException(
        'Erro de persistência no banco de dados',
      );
    }
  }
  async findById(id: string): Promise<UserEntity | null> {
    try {
      const user = await this.prisma.account.findUnique({
        where: { id },
        include: {
          // 💡 Use apenas include para bater com o tipo UserPermission
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      });

      const data = MapperToPrisma.toDto(user as UserPermission);
      return data;
    } catch (error) {
      this.logger.error('Erro ao buscar usuario  no banco', error);
      throw new InternalServerErrorException(
        'Erro de persistência no banco de dados',
      );
    }
  }
 
}
