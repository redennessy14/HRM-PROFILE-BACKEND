import { ProfileEntity } from 'src/data-access';
import { Profile } from 'src/profile/domain/profile/profile';

export class ProfileMapper {
  static toPersistence(profile: Profile): ProfileEntity {
    const profileEntity = new ProfileEntity();
    profileEntity.id = profile.id;
    profileEntity.firstName = profile.fullName.firstName;
    profileEntity.lastName = profile.fullName.lastName;
    profileEntity.email = profile.email.toString();
    profileEntity.password = profile.password;
    profileEntity.hiredAt = profile.hiredAt;
    return profileEntity;
  }
}
