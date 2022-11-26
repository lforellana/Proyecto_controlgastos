import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Ingreso,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioIngresoController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/ingreso', {
    responses: {
      '200': {
        description: 'Ingreso belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ingreso)},
          },
        },
      },
    },
  })
  async getIngreso(
    @param.path.string('id') id: typeof Usuario.prototype.id,
  ): Promise<Ingreso> {
    return this.usuarioRepository.ingreso(id);
  }
}
