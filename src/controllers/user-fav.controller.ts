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
import {Userfav} from '../models';
import {UserfavRepository} from '../repositories';

export class UserFavController {
  constructor(
    @repository(UserfavRepository)
    public userfavRepository : UserfavRepository,
  ) {}

  @post('/userfavs')
  @response(200, {
    description: 'Userfav model instance',
    content: {'application/json': {schema: getModelSchemaRef(Userfav)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userfav, {
            title: 'NewUserfav',
            
          }),
        },
      },
    })
    userfav: Userfav,
  ): Promise<Userfav> {
    return this.userfavRepository.create(userfav);
  }

  @get('/userfavs/count')
  @response(200, {
    description: 'Userfav model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Userfav) where?: Where<Userfav>,
  ): Promise<Count> {
    return this.userfavRepository.count(where);
  }

  @get('/userfavs')
  @response(200, {
    description: 'Array of Userfav model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Userfav, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Userfav) filter?: Filter<Userfav>,
  ): Promise<Userfav[]> {
    return this.userfavRepository.find(filter);
  }

  @patch('/userfavs')
  @response(200, {
    description: 'Userfav PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userfav, {partial: true}),
        },
      },
    })
    userfav: Userfav,
    @param.where(Userfav) where?: Where<Userfav>,
  ): Promise<Count> {
    return this.userfavRepository.updateAll(userfav, where);
  }

  @get('/userfavs/{id}')
  @response(200, {
    description: 'Userfav model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Userfav, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Userfav, {exclude: 'where'}) filter?: FilterExcludingWhere<Userfav>
  ): Promise<Userfav> {
    return this.userfavRepository.findById(id, filter);
  }

  @patch('/userfavs/{id}')
  @response(204, {
    description: 'Userfav PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userfav, {partial: true}),
        },
      },
    })
    userfav: Userfav,
  ): Promise<void> {
    await this.userfavRepository.updateById(id, userfav);
  }

  @put('/userfavs/{id}')
  @response(204, {
    description: 'Userfav PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userfav: Userfav,
  ): Promise<void> {
    await this.userfavRepository.replaceById(id, userfav);
  }

  @del('/userfavs/{id}')
  @response(204, {
    description: 'Userfav DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userfavRepository.deleteById(id);
  }
}
