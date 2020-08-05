import {DoctorCaseLabelApplication} from './application';
import {
  ConditionRepository,
  DoctorRepository,
  MedicalCaseRepository,
} from './repositories';
import {Model} from '@loopback/repository';
import fs from 'fs';
import {DataObject} from '@loopback/repository/dist/common-types';
import {Condition, Doctor, MedicalCase} from './models';
const path = require('path');
const bcrypt = require('bcrypt');

async function getObjectsFromTestData(key: string) {
  const fileContents = await fs.promises.readFile(
    path.resolve(__filename, '../data/testdata.json'),
    {
      encoding: 'utf8',
    },
  );
  const json = JSON.parse(fileContents);
  const allRecords: DataObject<Model>[] = json['models'][key];
  return allRecords;
}

export async function migrate(args: string[], doNotExit = false) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new DoctorCaseLabelApplication();
  await app.boot();
  await app.migrateSchema({existingSchema});

  // 2. Make further changes. When creating predefined model instances,
  // handle the case when these instances already exist.
  const doctorRepository = await app.getRepository(DoctorRepository);

  const doctorObjects: DataObject<Doctor>[] = await getObjectsFromTestData(
    'Doctor',
  );
  for (const item of doctorObjects) {
    const found = await doctorRepository.findOne({
      where: {username: item.username},
    });
    if (!found) {
      item.password = await bcrypt.hash(item.password, 10);
      await doctorRepository.create(item);
    }
  }

  const conditionRepository = await app.getRepository(ConditionRepository);
  const conditionObjects: DataObject<
    Condition
  >[] = await getObjectsFromTestData('Condition');
  for (const item of conditionObjects) {
    const found = await conditionRepository.findOne({where: {code: item.code}});
    if (!found) {
      await conditionRepository.create(item);
    }
  }

  const medicalCaseRepository = await app.getRepository(MedicalCaseRepository);
  const medicalCaseObjects: DataObject<
    MedicalCase
  >[] = await getObjectsFromTestData('MedicalCase');
  for (const item of medicalCaseObjects) {
    const found = await medicalCaseRepository.findOne({where: {ehr: item.ehr}});
    if (!found) {
      await medicalCaseRepository.create(item);
    }
  }

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  if (!doNotExit) process.exit(0);
}

if (process.argv[1].indexOf('migrate') > -1) {
  migrate(process.argv).catch(err => {
    console.error('Cannot migrate database schema', err);
    process.exit(1);
  });
}
