import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Ingreso, Gasto} from '../models';
import {IngresoRepository} from './ingreso.repository';
import {GastoRepository} from './gasto.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly ingreso: BelongsToAccessor<Ingreso, typeof Usuario.prototype.id>;

  public readonly gastos: HasManyRepositoryFactory<Gasto, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('IngresoRepository') protected ingresoRepositoryGetter: Getter<IngresoRepository>, @repository.getter('GastoRepository') protected gastoRepositoryGetter: Getter<GastoRepository>,
  ) {
    super(Usuario, dataSource);
    this.gastos = this.createHasManyRepositoryFactoryFor('gastos', gastoRepositoryGetter,);
    this.registerInclusionResolver('gastos', this.gastos.inclusionResolver);
    this.ingreso = this.createBelongsToAccessorFor('ingreso', ingresoRepositoryGetter,);
    this.registerInclusionResolver('ingreso', this.ingreso.inclusionResolver);
  }
}
