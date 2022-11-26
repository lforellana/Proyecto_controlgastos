import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Ingreso, IngresoRelations} from '../models';

export class IngresoRepository extends DefaultCrudRepository<
  Ingreso,
  typeof Ingreso.prototype.id,
  IngresoRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Ingreso, dataSource);
  }
}
