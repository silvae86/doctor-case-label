import {DefaultCrudRepository} from '@loopback/repository';
import {Condition, ConditionRelations} from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ConditionRepository extends DefaultCrudRepository<
  Condition,
  typeof Condition.prototype.id,
  ConditionRelations
> {
  constructor(@inject('datasources.MongoDB') dataSource: MongoDbDataSource) {
    super(Condition, dataSource);
  }
}
