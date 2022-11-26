import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Gasto,
  Usuario,
} from '../models';
import {GastoRepository} from '../repositories';

export class GastoUsuarioController {
  constructor(
    @repository(GastoRepository)
    public gastoRepository: GastoRepository,
  ) { }

  @get('/gastos/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Gasto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Gasto.prototype.id,
  ): Promise<Usuario> {
    return this.gastoRepository.usuario(id);
  }
}
