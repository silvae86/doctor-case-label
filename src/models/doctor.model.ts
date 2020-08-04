import {
  Entity,
  Filter,
  FilterBuilder,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {MedicalCase} from './medical-case.model';
import {DoctorRepository} from '../repositories';
import {MongoDbDataSource} from '../datasources';
const bcrypt = require('bcrypt');

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

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => MedicalCase)
  medicalCases?: MedicalCase[];

  constructor(data?: Partial<Doctor>) {
    super(data);
  }

  static async verify(
    username: string | undefined,
    password: string | undefined,
  ) {
    const repo: DoctorRepository = new DoctorRepository(
      new MongoDbDataSource(),
    );
    const doctorsFilterBuilder = new FilterBuilder();
    const usernameFilter: Filter<Doctor> = doctorsFilterBuilder
      .where({
        username: username,
      })
      .build();

    const doctor = await repo.findOne(usernameFilter);
    if (doctor != null) {
      const match = await bcrypt.compare(password, doctor.password);

      if (match) {
        return doctor;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

export interface DoctorRelations {
  // describe navigational properties here
}

export type DoctorWithRelations = Doctor & DoctorRelations;
