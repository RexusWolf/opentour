import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTeamDTO, Resource, TeamDTO, UserDTO } from '@opentour/contracts';
import { Response } from 'express';
import { ACGuard, UseRoles } from 'nest-access-control';

import { User } from '../../../shared/decorators/user.decorator';
import {
  TeamIdAlreadyTakenError,
  TeamIdNotFoundError,
  TeamNameAlreadyTakenError,
} from '../../domain';
import { TeamGuard } from '../auth/team.guard';
import { TeamService } from '../service/team.service';

@ApiBearerAuth()
@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({ summary: 'Create team' })
  @UseRoles({
    resource: Resource.Team,
    action: 'create',
    possession: 'any',
  })
  @UseGuards(TeamGuard, ACGuard)
  @Post()
  @ApiResponse({ status: 204, description: 'Create team' })
  async create(
    @Body() createTeamDto: CreateTeamDTO,
    @User() user: UserDTO
  ): Promise<TeamDTO> {
    try {
      return await this.teamService.createTeam({
        createTeamDto,
        userId: user.id,
      });
    } catch (error) {
      if (error instanceof TeamIdAlreadyTakenError) {
        throw new ConflictException(error.message);
      }
      if (error instanceof TeamNameAlreadyTakenError) {
        throw new ConflictException(error.message);
      }
      if (error instanceof Error) {
        throw new BadRequestException(`Unexpected error: ${error.message}`);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get teams' })
  @ApiResponse({ status: 200, description: 'Returns all teams' })
  async getTeams(@Res({ passthrough: true }) res: Response) {
    try {
      const teams = await this.teamService.getTeams();
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
  async getTeam(@Query('id') id: string): Promise<TeamDTO> {
    try {
      return await this.teamService.getTeam(id);
    } catch (error) {
      if (error instanceof TeamIdNotFoundError) {
        throw new NotFoundException('Team with provided id not found');
      } else if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get(':competitionId/teams')
  @ApiOperation({ summary: 'Get teams by its competition ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns all teams of a competition',
  })
  async getTeamsByCompetitionId(
    @Res({ passthrough: true }) res: Response,
    @Query('competitionId') competitionId: string
  ) {
    try {
      const teams = await this.teamService.getTeamsByCompetitionId(
        competitionId
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

  @ApiOperation({ summary: 'Delete team' })
  @ApiResponse({ status: 200, description: 'Delete team' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(200)
  @Delete(':id')
  @UseRoles({
    resource: Resource.Team,
    action: 'delete',
    possession: 'own',
  })
  @UseGuards(TeamGuard, ACGuard)
  async remove(@Param('id') id: string): Promise<TeamDTO> {
    try {
      return this.teamService.deleteTeam(id);
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
