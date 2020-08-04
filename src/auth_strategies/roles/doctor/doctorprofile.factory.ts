import {UserProfileFactory} from '@loopback/authentication';
import {securityId, UserProfile} from '@loopback/security';
import {Doctor} from '../../../models';

export const doctorUserProfileFactory: UserProfileFactory<Doctor> = function (
  doctor: Doctor,
): UserProfile {

  if(doctor.id != null)
  {
    return {[securityId]: doctor.id};
  }
  else
  {
    throw new Error("Error mapping Doctor to Doctor Profile");
  }
};
