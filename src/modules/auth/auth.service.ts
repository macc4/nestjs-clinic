import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { PatientsService } from '../patients/patients.service';
import { UserRole } from './utils/user-role.enum';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private patientsService: PatientsService,
  ) {}

  signToken(payload: JwtPayloadDto): string {
    return this.jwtService.sign(payload);
  }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { email, password, name, gender } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    let user: User;

    try {
      user = await this.usersRepository.createUser(
        email,
        hashedPassword,
        UserRole.PATIENT,
      );

      await this.patientsService.createPatient(
        {
          name,
          gender,
        },
        user,
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    const token = this.signToken({ id: user.id, role: user.role });

    return { token };
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;

    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = this.signToken({ id: user.id, role: user.role });

      return { token };
    } else {
      throw new UnauthorizedException('Email or password are incorrect');
    }
  }
}
