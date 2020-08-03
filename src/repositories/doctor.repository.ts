import {DefaultCrudRepository} from '@loopback/repository';
import {Doctor, DoctorRelations} from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DoctorRepository extends DefaultCrudRepository<
  Doctor,
  typeof Doctor.prototype.id,
  DoctorRelations
> {
  constructor(@inject('datasources.MongoDB') dataSource: MongoDbDataSource) {
    super(Doctor, dataSource);
  }
}
