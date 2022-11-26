import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Gasto, GastoRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class GastoRepository extends DefaultCrudRepository<
  Gasto,
  typeof Gasto.prototype.id,
  GastoRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Gasto.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Gasto, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
