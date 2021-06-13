import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
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
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMatchDTO, EditMatchDTO, MatchDTO } from '@opentour/contracts';
import { Response } from 'express';

import { MatchIdAlreadyTakenError , MatchIdNotFoundError } from '../../domain';
import { MatchService } from '../service/match.service';

@ApiTags('matches')
@Controller('matches')
@UseInterceptors(ClassSerializerInterceptor)
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Match created' })
  async create(@Body() createMatchDTO: CreateMatchDTO): Promise<MatchDTO> {
    try {
      return await this.matchService.createMatch({
        id: createMatchDTO.id,
        competitionId: createMatchDTO.competitionId,
        localTeamId: createMatchDTO.localTeamId,
        visitorTeamId: createMatchDTO.visitorTeamId,
        index: createMatchDTO.index,
        journey: createMatchDTO.journey,
      });
    } catch (error) {
      if (error instanceof MatchIdAlreadyTakenError) {
        throw new ConflictException(error.message);
      }
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Matches found' })
  async getMatches(@Res({ passthrough: true }) res: Response) {
    try {
      const matches = await this.matchService.getMatches();

      res.setHeader('X-Total-Count', matches.length);

      return matches;
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Match found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getMatch(@Query('id') id: string): Promise<MatchDTO | null> {
    try {
      return await this.matchService.getMatch(id);
    } catch (e) {
      if (e instanceof MatchIdNotFoundError) {
        throw new NotFoundException('Match not found');
      } else if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get(':competitionId/matches')
  @ApiOperation({ summary: 'Get matches of competition' })
  @ApiResponse({ status: 200, description: 'Matches found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getMatchesByCompetitionId(
    @Res({ passthrough: true }) res: Response,
    @Query('competitionId') competitionId: string
  ): Promise<MatchDTO[] | null> {
    try {
      const matches = await this.matchService.getMatchesByCompetitionId(
        competitionId
      );

      res.setHeader('X-Total-Count', matches.length);

      return matches;
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updated match' })
  @ApiResponse({ status: 200, description: 'Match updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(@Param('id') id: string, @Body() editMatchDTO: EditMatchDTO) {
    try {
      return await this.matchService.updateMatch({
        id,
        date: editMatchDTO.date,
        result: editMatchDTO.result,
      });
    } catch (e) {
      if (e instanceof MatchIdNotFoundError) {
        throw new NotFoundException('Match not found');
      } else if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @ApiOperation({ summary: 'Delete match' })
  @ApiResponse({ status: 200, description: 'Delete match' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(200)
  @Delete(':id')
  async remove(@Query('id') id: string): Promise<MatchDTO> {
    try {
      return this.matchService.deleteMatch(id);
    } catch (e) {
      if (e instanceof MatchIdNotFoundError) {
        throw new NotFoundException('Match not found');
      } else if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }
}
