import {
  BadRequestException,
  Body,
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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CompetitionDTO,
  CreateCompetitionDTO,
  EditCompetitionDTO,
} from '@opentour/contracts';
import { Response } from 'express';

import {
  CreateCompetitionCommand,
  DeleteCompetitionCommand,
  GetCompetitionQuery,
  GetCompetitionsQuery,
  UpdateCompetitionCommand,
} from '../../application';
import { CompetitionIdNotFoundError } from '../../domain/exception';

export class CompetitionController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Competition created' })
  async create(
    @Body() createCompetitionDto: CreateCompetitionDTO
  ): Promise<CompetitionDTO> {
    try {
      return await this.commandBus.execute(
        new CreateCompetitionCommand(
          createCompetitionDto.id,
          createCompetitionDto.name,
          createCompetitionDto.type,
          createCompetitionDto.sportId,
          createCompetitionDto.moderatorId
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
  @ApiResponse({ status: 200, description: 'Competitions found' })
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      const competitions = await this.queryBus.execute<
        GetCompetitionsQuery,
        CompetitionDTO[]
      >(new GetCompetitionsQuery());

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
  @ApiResponse({ status: 200, description: 'Competition found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id') id: string): Promise<CompetitionDTO> {
    try {
      const competition = await this.queryBus.execute<
        GetCompetitionQuery,
        CompetitionDTO
      >(new GetCompetitionQuery(id));

      if (!competition) throw new NotFoundException();

      return competition;
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

  @Put(':id')
  @ApiOperation({ summary: 'Updated competition' })
  @ApiResponse({ status: 200, description: 'Competition updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(
    @Param('id') id: string,
    @Body() editCompetitionDTO: EditCompetitionDTO
  ): Promise<EditCompetitionDTO> {
    try {
      const competition = await this.queryBus.execute<
        GetCompetitionQuery,
        CompetitionDTO
      >(new GetCompetitionQuery(id));

      if (!competition) throw new NotFoundException();

      return this.commandBus.execute(
        new UpdateCompetitionCommand(
          id,
          editCompetitionDTO.name,
          editCompetitionDTO.moderatorIds
        )
      );
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
  async remove(@Param('id') id: string): Promise<CompetitionDTO> {
    try {
      return this.commandBus.execute(new DeleteCompetitionCommand(id));
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
