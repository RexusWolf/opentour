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
  EditCompetitionDTO,
} from '@opentour/contracts';
import { Response } from 'express';

import {
  CompetitionIdAlreadyTakenError,
  CompetitionIdNotFoundError,
  CompetitionNameAlreadyTakenError,
} from '../../domain';
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
      return await this.competitionService.createCompetition({
        id: createCompetitionDto.id,
        name: createCompetitionDto.name,
        type: createCompetitionDto.type,
        sportName: createCompetitionDto.sportName,
        moderatorId: createCompetitionDto.moderatorId,
      });
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

  @Put(':id')
  @ApiOperation({ summary: 'Update competition' })
  @ApiResponse({ status: 204, description: 'Competition updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(
    @Param('id') id: string,
    @Body() editCompetitionDTO: EditCompetitionDTO
  ) {
    try {
      return await this.competitionService.updateCompetition({
        id,
        name: editCompetitionDTO.name,
        moderatorIds: editCompetitionDTO.moderatorIds,
      });
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

  @Put(':id/start')
  @ApiOperation({ summary: 'Start competition' })
  @ApiResponse({ status: 204, description: 'Competition started' })
  @ApiResponse({ status: 404, description: 'Not found' })
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

  @ApiOperation({ summary: 'Delete competition' })
  @ApiResponse({ status: 200, description: 'Delete competition' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(200)
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
}
