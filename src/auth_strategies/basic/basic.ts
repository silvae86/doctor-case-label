import {BasicStrategy} from 'passport-http';
import {Doctor} from '../../models';
import {DoctorRepository} from '../../repositories';
import {MongoDbDataSource} from '../../datasources';
import {FilterBuilder} from '@loopback/repository';
import {Filter} from '@loopback/repository/dist/query';
import {StrategyAdapter} from '@loopback/authentication-passport';
import {doctorUserProfileFactory} from '../roles/doctor/doctorprofile.factory';

const bcrypt = require('bcrypt');

async function verify(username: string, password: string) {
  const repo: DoctorRepository = new DoctorRepository(new MongoDbDataSource());
  const doctorsFilterBuilder = new FilterBuilder();
  const usernameFilter: Filter<Doctor> = doctorsFilterBuilder.where({
    username: username,
  }).build();

  const doctor = await repo.findOne(usernameFilter)
  if(doctor != null)
  {
    const match = await bcrypt.compare(password, doctor.password);

    if(match) {
      return doctor;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}
const basicStrategy = new BasicStrategy(verify);

// Apply the adapter
export const BASIC_AUTH_STRATEGY_NAME = 'basic';
export const basicAuthStrategy = new StrategyAdapter(
  // The configured basic strategy instance
  basicStrategy,
  // Give the strategy a name
  // You'd better define your strategy name as a constant, like
  // `const BASIC_AUTH_STRATEGY_NAME = 'basic'`.
  // You will need to decorate the APIs later with the same name.
  BASIC_AUTH_STRATEGY_NAME,
  // Provide a user profile factory
  doctorUserProfileFactory,
);
