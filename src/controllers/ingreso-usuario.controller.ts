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
  Ingreso,
  Usuario,
} from '../models';
import {IngresoRepository} from '../repositories';

export class IngresoUsuarioController {
  constructor(
    @repository(IngresoRepository) protected ingresoRepository: IngresoRepository,
  ) { }

  @get('/ingresos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Ingreso has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.ingresoRepository.usuarios(id).find(filter);
  }

  @post('/ingresos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Ingreso model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ingreso.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInIngreso',
            exclude: ['id'],
            optional: ['ingresoId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.ingresoRepository.usuarios(id).create(usuario);
  }

  @patch('/ingresos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Ingreso.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.ingresoRepository.usuarios(id).patch(usuario, where);
  }

  @del('/ingresos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Ingreso.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.ingresoRepository.usuarios(id).delete(where);
  }
}
