import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Gasto,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioGastoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/gastos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Gasto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Gasto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Gasto>,
  ): Promise<Gasto[]> {
    return this.usuarioRepository.gastos(id).find(filter);
  }

  @post('/usuarios/{id}/gastos', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Gasto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gasto, {
            title: 'NewGastoInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) gasto: Omit<Gasto, 'id'>,
  ): Promise<Gasto> {
    return this.usuarioRepository.gastos(id).create(gasto);
  }

  @patch('/usuarios/{id}/gastos', {
    responses: {
      '200': {
        description: 'Usuario.Gasto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gasto, {partial: true}),
        },
      },
    })
    gasto: Partial<Gasto>,
    @param.query.object('where', getWhereSchemaFor(Gasto)) where?: Where<Gasto>,
  ): Promise<Count> {
    return this.usuarioRepository.gastos(id).patch(gasto, where);
  }

  @del('/usuarios/{id}/gastos', {
    responses: {
      '200': {
        description: 'Usuario.Gasto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Gasto)) where?: Where<Gasto>,
  ): Promise<Count> {
    return this.usuarioRepository.gastos(id).delete(where);
  }
}
