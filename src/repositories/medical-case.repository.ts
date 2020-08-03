import {DefaultCrudRepository} from '@loopback/repository';
import {MedicalCase, MedicalCaseRelations} from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MedicalCaseRepository extends DefaultCrudRepository<
  MedicalCase,
  typeof MedicalCase.prototype.id,
  MedicalCaseRelations
> {
  constructor(@inject('datasources.MongoDB') dataSource: MongoDbDataSource) {
    super(MedicalCase, dataSource);
  }
}
