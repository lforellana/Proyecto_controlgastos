import {Entity, model, property} from '@loopback/repository';

@model()
export class Ingreso extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'boolean',
    required: true,
  })
  valor: boolean;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  usuarioId: string;


  constructor(data?: Partial<Ingreso>) {
    super(data);
  }
}

export interface IngresoRelations {
  // describe navigational properties here
}

export type IngresoWithRelations = Ingreso & IngresoRelations;
