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
  Put,
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
import {
  CompetitionDTO,
  CreateCompetitionDTO,
  RankingDTO,
  Resource,
} from '@opentour/contracts';
import { Response } from 'express';
import { ACGuard, UseRoles } from 'nest-access-control';

import {
  CompetitionIdAlreadyTakenError,
  CompetitionIdNotFoundError,
  CompetitionNameAlreadyTakenError,
} from '../../domain';
import { CompetitionGuard } from '../auth/competition.guard';
import { CompetitionService } from '../service/competition.service';

@ApiBearerAuth()
@ApiTags('competitions')
@Controller('competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @ApiOperation({ summary: 'Create competition' })
  @ApiResponse({ status: 204, description: 'Create competition' })
  @Post()
  async create(
    @Body() createCompetitionDto: CreateCompetitionDTO
  ): Promise<CompetitionDTO> {
    try {
      return await this.competitionService.createCompetition(
        createCompetitionDto
      );
    } catch (error) {
      if (error instanceof CompetitionIdAlreadyTakenError) {
        throw new ConflictException(error.message);
      }
      if (error instanceof CompetitionNameAlreadyTakenError) {
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
  @ApiOperation({ summary: 'Get competitions' })
  @ApiResponse({ status: 200, description: 'Returns all competitions' })
  async getCompetitions(@Res({ passthrough: true }) res: Response) {
    try {
      const competitions = await this.competitionService.getCompetitions();
      res.setHeader('X-Total-Count', competitions.length);
      return competitions;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get competition by ID' })
  @ApiResponse({ status: 200, description: 'Competition found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getCompetition(
    @Query('id') id: string
  ): Promise<CompetitionDTO | null> {
    try {
      return await this.competitionService.getCompetition(id);
    } catch (error) {
      if (error instanceof CompetitionIdNotFoundError) {
        throw new NotFoundException('Competition with provided id not found');
      } else if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Put(':id/start')
  @ApiOperation({ summary: 'Start competition' })
  @ApiResponse({ status: 204, description: 'Competition started' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseRoles({
    resource: Resource.Competition,
    action: 'update',
    possession: 'own',
  })
  @UseGuards(CompetitionGuard, ACGuard)
  async start(@Param('id') id: string) {
    try {
      return await this.competitionService.startCompetition(id);
    } catch (error) {
      if (error instanceof CompetitionIdNotFoundError) {
        throw new NotFoundException('Competition not found');
      } else if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Put(':id/nextRound')
  @ApiOperation({ summary: 'Go to next round of competition' })
  @ApiResponse({
    status: 204,
    description: 'Competition next round has started',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseRoles({
    resource: Resource.Competition,
    action: 'update',
    possession: 'own',
  })
  @UseGuards(CompetitionGuard, ACGuard)
  async nextRound(@Param('id') id: string) {
    try {
      return await this.competitionService.nextRound(id);
    } catch (error) {
      if (error instanceof CompetitionIdNotFoundError) {
        throw new NotFoundException('Competition not found');
      } else if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Put(':id/moderators')
  @ApiOperation({ summary: 'Add moderator to competition' })
  @ApiResponse({ status: 204, description: 'Moderator added to competition' })
  @ApiResponse({
    status: 404,
    description: 'Error adding moderator to competition',
  })
  @UseRoles({
    resource: Resource.Competition,
    action: 'update',
    possession: 'own',
  })
  @UseGuards(CompetitionGuard, ACGuard)
  async addModerator(
    @Param('id') id: string,
    @Body('moderatorEmail') moderatorEmail: string
  ) {
    try {
      return await this.competitionService.addModerator(id, moderatorEmail);
    } catch (error) {
      if (error instanceof CompetitionIdNotFoundError) {
        throw new NotFoundException('Competition not found');
      } else if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @ApiOperation({ summary: 'Delete competition' })
  @ApiResponse({ status: 200, description: 'Delete competition' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(200)
  @UseRoles({
    resource: Resource.Competition,
    action: 'delete',
    possession: 'own',
  })
  @UseGuards(CompetitionGuard, ACGuard)
  @Delete(':id')
  async remove(@Query('id') id: string): Promise<CompetitionDTO> {
    try {
      return this.competitionService.deleteCompetition(id);
    } catch (error) {
      if (error instanceof CompetitionIdNotFoundError) {
        throw new NotFoundException('Competition not found');
      } else if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get(':competitionId/ranking')
  @ApiOperation({ summary: 'Get competition ranking by ID' })
  @ApiResponse({ status: 200, description: 'Competition ranking found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getCompetitionRanking(
    @Query('competitionId') competitionId: string
  ): Promise<RankingDTO | null> {
    try {
      return await this.competitionService.getCompetitionRanking(competitionId);
    } catch (error) {
      if (error instanceof CompetitionIdNotFoundError) {
        throw new NotFoundException('Competition with provided id not found');
      } else if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }
}
