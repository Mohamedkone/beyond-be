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
import {Econtacts} from '../models';
import {EcontactsRepository} from '../repositories';

export class EcontrollerController {
  constructor(
    @repository(EcontactsRepository)
    public econtactsRepository : EcontactsRepository,
  ) {}

  @post('/econtacts')
  @response(200, {
    description: 'Econtacts model instance',
    content: {'application/json': {schema: getModelSchemaRef(Econtacts)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Econtacts, {
            title: 'NewEcontacts',

          }),
        },
      },
    })
    econtacts: Econtacts,
  ): Promise<Econtacts> {
    return this.econtactsRepository.create(econtacts);
  }

  @get('/econtacts/count')
  @response(200, {
    description: 'Econtacts model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Econtacts) where?: Where<Econtacts>,
  ): Promise<Count> {
    return this.econtactsRepository.count(where);
  }

  @get('/econtacts')
  @response(200, {
    description: 'Array of Econtacts model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Econtacts, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Econtacts) filter?: Filter<Econtacts>,
  ): Promise<Econtacts[]> {
    return this.econtactsRepository.find(filter);
  }

  @patch('/econtacts')
  @response(200, {
    description: 'Econtacts PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Econtacts, {partial: true}),
        },
      },
    })
    econtacts: Econtacts,
    @param.where(Econtacts) where?: Where<Econtacts>,
  ): Promise<Count> {
    return this.econtactsRepository.updateAll(econtacts, where);
  }

  @get('/econtacts/{id}')
  @response(200, {
    description: 'Econtacts model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Econtacts, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Econtacts, {exclude: 'where'}) filter?: FilterExcludingWhere<Econtacts>
  ): Promise<Econtacts> {
    return this.econtactsRepository.findById(id, filter);
  }

  @patch('/econtacts/{id}')
  @response(204, {
    description: 'Econtacts PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Econtacts, {partial: true}),
        },
      },
    })
    econtacts: Econtacts,
  ): Promise<void> {
    await this.econtactsRepository.updateById(id, econtacts);
  }

  @put('/econtacts/{id}')
  @response(204, {
    description: 'Econtacts PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() econtacts: Econtacts,
  ): Promise<void> {
    await this.econtactsRepository.replaceById(id, econtacts);
  }

  @del('/econtacts/{id}')
  @response(204, {
    description: 'Econtacts DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.econtactsRepository.deleteById(id);
  }
}
