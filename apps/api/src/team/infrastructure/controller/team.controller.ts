import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTeamDTO, EditTeamDTO, TeamDTO } from '@opentour/contracts';
import { Response } from 'express';

import {
  CreateTeamCommand,
  DeleteTeamCommand,
  GetTeamQuery,
  GetTeamsQuery,
  UpdateTeamCommand,
} from '../../application';
import { TeamIdNotFoundError } from '../../domain/exception';

@ApiBearerAuth()
@Controller('teams')
export class TeamController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Team created' })
  async create(@Body() createTeamDTO: CreateTeamDTO): Promise<TeamDTO> {
    try {
      return await this.commandBus.execute(
        new CreateTeamCommand(
          createTeamDTO.id,
          createTeamDTO.competitionId,
          createTeamDTO.name,
          createTeamDTO.captainId
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Teams found' })
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      const teams = await this.queryBus.execute<GetTeamsQuery, TeamDTO[]>(
        new GetTeamsQuery()
      );

      res.setHeader('X-Total-Count', teams.length);
      return teams;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Team found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id') id: string): Promise<TeamDTO> {
    try {
      const team = await this.queryBus.execute<GetTeamQuery, TeamDTO>(
        new GetTeamQuery(id)
      );

      if (!team) throw new NotFoundException();

      return team;
    } catch (error) {
      if (error instanceof TeamIdNotFoundError) {
        throw new NotFoundException('Team not found');
      } else if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updated team' })
  @ApiResponse({ status: 200, description: 'Team updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(
    @Param('id') id: string,
    @Body() editTeamDTO: EditTeamDTO
  ): Promise<EditTeamDTO> {
    try {
      const team = await this.queryBus.execute<GetTeamQuery, TeamDTO>(
        new GetTeamQuery(id)
      );

      if (!team) throw new NotFoundException();

      return this.commandBus.execute(
        new UpdateTeamCommand(id, editTeamDTO.name, editTeamDTO.membersIds)
      );
    } catch (error) {
      if (error instanceof TeamIdNotFoundError) {
        throw new NotFoundException('Team not found');
      } else if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @ApiOperation({ summary: 'Delete team' })
  @ApiResponse({ status: 200, description: 'Delete team' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<TeamDTO> {
    try {
      return this.commandBus.execute(new DeleteTeamCommand(id));
    } catch (error) {
      if (error instanceof TeamIdNotFoundError) {
        throw new NotFoundException('Team not found');
      } else if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }
}
