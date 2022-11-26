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
import {Gasto} from '../models';
import {GastoRepository} from '../repositories';

export class GastoController {
  constructor(
    @repository(GastoRepository)
    public gastoRepository : GastoRepository,
  ) {}

  @post('/gastos')
  @response(200, {
    description: 'Gasto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Gasto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gasto, {
            title: 'NewGasto',
            exclude: ['id'],
          }),
        },
      },
    })
    gasto: Omit<Gasto, 'id'>,
  ): Promise<Gasto> {
    return this.gastoRepository.create(gasto);
  }

  @get('/gastos/count')
  @response(200, {
    description: 'Gasto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Gasto) where?: Where<Gasto>,
  ): Promise<Count> {
    return this.gastoRepository.count(where);
  }

  @get('/gastos')
  @response(200, {
    description: 'Array of Gasto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Gasto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Gasto) filter?: Filter<Gasto>,
  ): Promise<Gasto[]> {
    return this.gastoRepository.find(filter);
  }

  @patch('/gastos')
  @response(200, {
    description: 'Gasto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gasto, {partial: true}),
        },
      },
    })
    gasto: Gasto,
    @param.where(Gasto) where?: Where<Gasto>,
  ): Promise<Count> {
    return this.gastoRepository.updateAll(gasto, where);
  }

  @get('/gastos/{id}')
  @response(200, {
    description: 'Gasto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Gasto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Gasto, {exclude: 'where'}) filter?: FilterExcludingWhere<Gasto>
  ): Promise<Gasto> {
    return this.gastoRepository.findById(id, filter);
  }

  @patch('/gastos/{id}')
  @response(204, {
    description: 'Gasto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gasto, {partial: true}),
        },
      },
    })
    gasto: Gasto,
  ): Promise<void> {
    await this.gastoRepository.updateById(id, gasto);
  }

  @put('/gastos/{id}')
  @response(204, {
    description: 'Gasto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() gasto: Gasto,
  ): Promise<void> {
    await this.gastoRepository.replaceById(id, gasto);
  }

  @del('/gastos/{id}')
  @response(204, {
    description: 'Gasto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gastoRepository.deleteById(id);
  }
}
