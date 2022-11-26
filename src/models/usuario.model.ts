import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Ingreso} from './ingreso.model';
import {Gasto} from './gasto.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @belongsTo(() => Ingreso)
  ingresoId: string;

  @hasMany(() => Gasto)
  gastos: Gasto[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
