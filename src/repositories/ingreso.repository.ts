import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Ingreso, IngresoRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class IngresoRepository extends DefaultCrudRepository<
  Ingreso,
  typeof Ingreso.prototype.id,
  IngresoRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Ingreso.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Ingreso, dataSource);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
