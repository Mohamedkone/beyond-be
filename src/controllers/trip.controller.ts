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
import {Trips} from '../models';
import {TripsRepository} from '../repositories';

export class TripController {
  constructor(
    @repository(TripsRepository)
    public tripsRepository : TripsRepository,
  ) {}

  @post('/trips')
  @response(200, {
    description: 'Trips model instance',
    content: {'application/json': {schema: getModelSchemaRef(Trips)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trips, {
            title: 'NewTrips',

          }),
        },
      },
    })
    trips: Trips,
  ): Promise<Trips> {
    return this.tripsRepository.create(trips);
  }

  @get('/trips/count')
  @response(200, {
    description: 'Trips model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Trips) where?: Where<Trips>,
  ): Promise<Count> {
    return this.tripsRepository.count(where);
  }

  @get('/trips/{userId}')
  @response(200, {
    description: 'Array of Trips model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Trips, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.path.string("userId") userId: string,
    @param.filter(Trips) filter?: Filter<Trips>,
  ): Promise<Trips[]> {
    const tripFilter = { where: { userId: userId } };
    const effectiveFilter = { ...filter, ...tripFilter };
    return this.tripsRepository.find(effectiveFilter);
  }

  @patch('/trips')
  @response(200, {
    description: 'Trips PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trips, {partial: true}),
        },
      },
    })
    trips: Trips,
    @param.where(Trips) where?: Where<Trips>,
  ): Promise<Count> {
    return this.tripsRepository.updateAll(trips, where);
  }

  @get('/trips/{id}')
  @response(200, {
    description: 'Trips model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Trips, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Trips, {exclude: 'where'}) filter?: FilterExcludingWhere<Trips>
  ): Promise<Trips> {
    return this.tripsRepository.findById(id, filter);
  }

  @get('/trips/closest')
  @response(200, {
    description: 'Find closest trip for a user',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Trips, {includeRelations: true}),
      },
    },
  })
  async findClosestByUserId(
    @param.query.string('userId') userId: string
  ): Promise<Trips | null> {
    const today = new Date();
    const trips = await this.tripsRepository.find({
      where: { userId: userId },
      order: ['sDate ASC'], // Ascending order
      limit: 1 // Only get the closest one
    });

    // Filter out trips where sDate is in the past
    const futureTrips = trips.filter(trip => new Date(trip.sDate) >= today);

    // If no future trips are found, return null or the closest past trip
    if (futureTrips.length === 0) {
      if (trips.length > 0) {
        // All trips are in the past; return the one closest to today's date
        return trips[0];
      }
      return null; // No trips at all
    }

    return futureTrips[0]; // Return the closest future trip
  }
  
  @patch('/trips/{id}')
  @response(204, {
    description: 'Trips PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trips, {partial: true}),
        },
      },
    })
    trips: Trips,
  ): Promise<void> {
    await this.tripsRepository.updateById(id, trips);
  }

  @put('/trips/{id}')
  @response(204, {
    description: 'Trips PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() trips: Trips,
  ): Promise<void> {
    await this.tripsRepository.replaceById(id, trips);
  }

  @del('/trips/{id}')
  @response(204, {
    description: 'Trips DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tripsRepository.deleteById(id);
  }
}
