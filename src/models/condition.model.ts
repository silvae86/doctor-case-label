import {Entity, hasMany, model, property} from '@loopback/repository';
import {MedicalCase} from './medical-case.model';

@model()
export class Condition extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    unique: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @hasMany(() => MedicalCase)
  medicalCases?: MedicalCase[];

  constructor(data?: Partial<Condition>) {
    super(data);
  }
}

export interface ConditionRelations {
  // describe navigational properties here
}

export type ConditionWithRelations = Condition & ConditionRelations;
