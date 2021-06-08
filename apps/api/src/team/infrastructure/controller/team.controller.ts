import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTeamDTO, TeamDTO } from '@opentour/contracts';
import { Response } from 'express';

import {
  TeamIdAlreadyTakenError,
  TeamIdNotFoundError,
  TeamNameAlreadyTakenError,
} from '../../domain/exception';
import { TeamService } from '../service/team.service';

@ApiBearerAuth()
@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({ summary: 'Create team' })
  @ApiResponse({ status: 204, description: 'Create team' })
  @Post('')
  async create(@Body() createTeamDto: CreateTeamDTO): Promise<TeamDTO> {
    try {
      return await this.teamService.createTeam({
        id: createTeamDto.id,
        name: createTeamDto.name,
        competitionId: createTeamDto.competitionId,
        captainId: createTeamDto.captainId,
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
  async findAll(@Res({ passthrough: true }) res: Response) {
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
  async findOne(@Query('id') id: string): Promise<TeamDTO | null> {
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

  @ApiOperation({ summary: 'Delete team' })
  @ApiResponse({ status: 200, description: 'Delete team' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(200)
  @Delete(':id')
  async remove(@Query('id') id: string): Promise<TeamDTO> {
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
