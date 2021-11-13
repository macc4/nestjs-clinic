import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { CreateProfileDto } from '../dto/create-profile.dto';

interface ProfileGRPCService {
  createProfile(
    data: CreateProfileDto,
    metadata: Metadata,
  ): Observable<Profile>;
  getProfileByUserId(
    data: { userId: string },
    metadata: Metadata,
  ): Observable<Profile>;
  getBatchProfiles(
    data: { userIds: string[] },
    metadata: Metadata,
  ): Observable<ProfilesArray>;
}

interface Profile {
  id: number;
  name: string;
  gender: string;
  user_id: string;
}

interface ProfilesArray {
  profiles: Profile[];
}

export default ProfileGRPCService;