import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Put,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AddRoleToUserDTO,
  CreateUserDTO,
  RemoveRoleFromUserDTO,
  Role,
  UserDTO,
} from '@opentour/contracts';
import { Response } from 'express';
import { Roles } from '../../../auth/security/roles.decorator';
import {
  CreateUserCommand,
  DeleteUserCommand,
  GetUserQuery,
  GetUsersQuery,
  AddRoleToUserCommand,
  RemoveRoleFromUserCommand,
} from '../../application';
import { UserIdNotFoundError } from '../../domain';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  @ApiResponse({ status: 200, description: 'User created' })
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserDTO> {
    try {
      return await this.commandBus.execute(
        new CreateUserCommand({
          userId: createUserDto.id,
          email: createUserDto.email,
          roles: createUserDto.roles,
        })
      );
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get()
  @Roles(Role.Admin)
  @ApiResponse({ status: 200, description: 'Users found' })
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      const users = await this.queryBus.execute<GetUsersQuery, UserDTO[]>(
        new GetUsersQuery()
      );

      res.setHeader('X-Total-Count', users.length);

      return users;
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get(':id')
  @Roles(Role.Admin)
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Query('id') id: string): Promise<UserDTO> {
    try {
      const user = await this.queryBus.execute<GetUserQuery, UserDTO>(
        new GetUserQuery(id)
      );

      if (!user) throw new NotFoundException();

      return user;
    } catch (e) {
      if (e instanceof UserIdNotFoundError) {
        throw new NotFoundException('User not found');
      } else if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Put(':id/addRole')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Add role to user' })
  @ApiResponse({ status: 200, description: 'User role was added' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async addRole(
    @Query('id') id: string,
    @Body() addRoleToUserDTO: AddRoleToUserDTO
  ): Promise<UserDTO> {
    try {
      const user = await this.queryBus.execute<GetUserQuery, UserDTO>(
        new GetUserQuery(id)
      );

      if (!user) throw new NotFoundException();

      return this.commandBus.execute(
        new AddRoleToUserCommand(id, addRoleToUserDTO.role)
      );
    } catch (e) {
      if (e instanceof UserIdNotFoundError) {
        throw new NotFoundException('User not found');
      } else if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Put(':id/removeRole')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Remove role from user' })
  @ApiResponse({ status: 200, description: 'Role was removed from user' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async removeRole(
    @Query('id') id: string,
    @Body() removeRoleFromUserDTO: RemoveRoleFromUserDTO
  ): Promise<UserDTO> {
    try {
      const user = await this.queryBus.execute<GetUserQuery, UserDTO>(
        new GetUserQuery(id)
      );

      if (!user) throw new NotFoundException();

      return this.commandBus.execute(
        new RemoveRoleFromUserCommand(id, removeRoleFromUserDTO.role)
      );
    } catch (e) {
      if (e instanceof UserIdNotFoundError) {
        throw new NotFoundException('User not found');
      } else if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'Delete user' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(200)
  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Query('id') id: string): Promise<UserDTO> {
    try {
      return this.commandBus.execute(new DeleteUserCommand(id));
    } catch (e) {
      if (e instanceof UserIdNotFoundError) {
        throw new NotFoundException('User not found');
      } else if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }
}
