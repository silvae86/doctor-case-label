import {
  ConditionRepository,
  DoctorRepository,
  MedicalCaseRepository,
} from '../../repositories';
import {testdb} from '../fixtures/datasources/testdb.datasource';
import {Doctor} from '../../models';
import {DataObject} from '@loopback/repository/dist/common-types';
import * as fs from 'fs';
import {Model} from '@loopback/repository';

export async function givenEmptyDatabase() {
  const medicalCaseRepository: MedicalCaseRepository = new MedicalCaseRepository(
    testdb,
  );
  const conditionRepository: ConditionRepository = new ConditionRepository(
    testdb,
  );
  const doctorRepository: DoctorRepository = new DoctorRepository(testdb);

  await medicalCaseRepository.deleteAll();
  await conditionRepository.deleteAll();
  await doctorRepository.deleteAll();
}

async function getObjectsFromTestData (key: string, parseFunction: (dataObject: Partial<Model>) => object) {
  const fileContents = await fs.promises.readFile('../fixtures/data/example.json', {encoding: 'utf8'});
  const json = JSON.parse(fileContents);
  const allRecords : DataObject<Model>[] = json['models'][key].map(parseFunction);
  return allRecords;
}

export function givenDoctorData(data?: Partial<Doctor>) {
  return Object.assign(
    {
      firstName: 'john-',
      surname: 'doe-doctor',
      username: 'jonhdoe',
      password: 'r00t',
    },
    data,
  );
}

export async function givenDoctors() {
  return new DoctorRepository(testdb).createAll(await getObjectsFromTestData('Doctor', givenDoctorData));
}


