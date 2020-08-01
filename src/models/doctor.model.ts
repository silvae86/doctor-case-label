import {Entity, hasMany, model, property} from '@loopback/repository';
import {MedicalCase} from './medical-case.model';

@model()
export class Doctor extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  surname: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @hasMany(() => MedicalCase)
  medicalCases?: MedicalCase[];

  constructor(data?: Partial<Doctor>) {
    super(data);
  }
}

export interface DoctorRelations {
  // describe navigational properties here
}

export type DoctorWithRelations = Doctor & DoctorRelations;
