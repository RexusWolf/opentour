import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
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
import { CreateMatchDTO, EditMatchDTO, MatchDTO } from '@opentour/contracts';
import { Response } from 'express';

import {
  CreateMatchCommand,
  DeleteMatchCommand,
  GetMatchesQuery,
  GetMatchQuery,
  UpdateMatchCommand,
} from '../../application';
import { MatchIdNotFoundError } from '../../domain/exception/match-id-not-found.error';
import { MatchResult, TeamScore } from '../../domain/model';

@ApiBearerAuth()
@ApiTags('matches')
@Controller('matches')
@UseInterceptors(ClassSerializerInterceptor)
export class MatchController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Match created' })
  async create(@Body() createMatchDTO: CreateMatchDTO): Promise<MatchDTO> {
    try {
      return await this.commandBus.execute(
        new CreateMatchCommand({
          id: createMatchDTO.id,
          competitionId: createMatchDTO.competitionId,
          index: createMatchDTO.index,
          journey: createMatchDTO.journey,
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
  @ApiResponse({ status: 200, description: 'Matches found' })
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      const matches = await this.queryBus.execute<GetMatchesQuery, MatchDTO[]>(
        new GetMatchesQuery()
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

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Match found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id') id: string): Promise<MatchDTO> {
    try {
      const match = await this.queryBus.execute<GetMatchQuery, MatchDTO>(
        new GetMatchQuery(id)
      );

      if (!match) throw new NotFoundException();

      return match;
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

  @Put(':id')
  @ApiOperation({ summary: 'Updated match' })
  @ApiResponse({ status: 200, description: 'Match updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(
    @Param('id') id: string,
    @Body() editMatchDTO: EditMatchDTO
  ): Promise<MatchDTO> {
    try {
      const match = await this.queryBus.execute<GetMatchQuery, MatchDTO>(
        new GetMatchQuery(id)
      );

      if (!match) throw new NotFoundException();

      return this.commandBus.execute(
        new UpdateMatchCommand({
          id,
          localTeamId: editMatchDTO.localTeamId,
          visitorTeamId: editMatchDTO.visitorTeamId,
          date: editMatchDTO.date,
          result: new MatchResult({
            localTeamScore: TeamScore.fromNumber(
              editMatchDTO.result.localTeamScore
            ),
            visitorTeamScore: TeamScore.fromNumber(
              editMatchDTO.result.visitorTeamScore
            ),
          }),
        })
      );
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
  async remove(@Param('id') id: string): Promise<MatchDTO> {
    try {
      return this.commandBus.execute(new DeleteMatchCommand(id));
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
