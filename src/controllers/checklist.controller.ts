import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Checklist} from '../models';
import {ChecklistRepository} from '../repositories';

export class ChecklistController {
  constructor(
    @repository(ChecklistRepository)
    public checklistRepository : ChecklistRepository,
  ) {}

  @post('/checklists')
  @response(200, {
    description: 'Checklist model instance',
    content: {'application/json': {schema: getModelSchemaRef(Checklist)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Checklist, {
            title: 'NewChecklist',
            exclude: ['id'],
          }),
        },
      },
    })
    checklist: Omit<Checklist, 'id'>,
  ): Promise<Checklist> {
    return this.checklistRepository.create(checklist);
  }

  @get('/checklists/count')
  @response(200, {
    description: 'Checklist model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Checklist) where?: Where<Checklist>,
  ): Promise<Count> {
    return this.checklistRepository.count(where);
  }

  @get('/checklists')
  @response(200, {
    description: 'Array of Checklist model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Checklist, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Checklist) filter?: Filter<Checklist>,
  ): Promise<Checklist[]> {
    return this.checklistRepository.find(filter);
  }

  @patch('/checklists')
  @response(200, {
    description: 'Checklist PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Checklist, {partial: true}),
        },
      },
    })
    checklist: Checklist,
    @param.where(Checklist) where?: Where<Checklist>,
  ): Promise<Count> {
    return this.checklistRepository.updateAll(checklist, where);
  }

  @get('/checklists/{userId}')
@response(200, {
  description: 'Array of Checklist model instances with Trip names',
  content: {
    'application/json': {
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {type: 'number'},
            tripId: {type: 'string'},
            checklist: {
              type: 'array',
              items: {type: 'object'},
            },
            lastUpdate: {type: 'string'},
            userId: {type: 'string'},
            tripName: {type: 'string'},
          },
        },
      },
    },
  },
})
async findAll(
  @param.path.string('userId') userId: string,
  @param.filter(Checklist, {exclude: 'where'}) filter?: FilterExcludingWhere<Checklist>
): Promise<object[]> {
  const checklists = await this.checklistRepository.find({
    where: {userId: userId},
    include: [{relation: 'trip', scope: {fields: ['name']}}],
    ...filter,
  });

  return checklists.map(checklist => ({
    ...checklist,
    tripName: checklist.trip?.name || null,
  }));
}


  @patch('/checklists/{id}')
  @response(204, {
    description: 'Checklist PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Checklist, {partial: true}),
        },
      },
    })
    checklist: Checklist,
  ): Promise<void> {
    await this.checklistRepository.updateById(id, checklist);
  }

  @put('/checklists/{id}')
  @response(204, {
    description: 'Checklist PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() checklist: Checklist,
  ): Promise<void> {
    await this.checklistRepository.replaceById(id, checklist);
  }

  @del('/checklists/{id}')
  @response(204, {
    description: 'Checklist DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.checklistRepository.deleteById(id);
  }
}
