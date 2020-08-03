import {BasicStrategy} from 'passport-http';
import {Doctor} from '../models';
import {DoctorRepository} from '../repositories';
import {MongoDbDataSource} from '../datasources';
import {FilterBuilder} from '@loopback/repository';

function verify(username: string, password: string, cb: Function) {
  const repo: DoctorRepository = new DoctorRepository(new MongoDbDataSource());
  const usernameAndPasswordFilter = 
  repo.find(username, password, cb);
}
const basicStrategy = new BasicStrategy(verify);
