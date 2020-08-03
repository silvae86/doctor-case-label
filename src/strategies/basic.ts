import {BasicStrategy} from 'passport-http';
import {Doctor} from '../models';
import {DoctorRepository} from '../repositories';
import {MongoDbDataSource} from '../datasources';
import {FilterBuilder} from '@loopback/repository';
import {Filter} from '@loopback/repository/dist/query';

function verify(username: string, password: string, cb: Function) {
  const repo: DoctorRepository = new DoctorRepository(new MongoDbDataSource());
  const doctorsFilterBuilder = new FilterBuilder();
  const usernameAndPasswordFilter: Filter<Doctor> = doctorsFilterBuilder.where({
    username: username,
    password: password
  }).build();

  const doctor: Doctor = repo.findOne(usernameAndPasswordFilter)
  return doctor;
}
exports.basicStrategy = new BasicStrategy(verify);
