import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { PatientsService } from '../patients/patients.service';
import { UserRole } from '../users/user-role.enum';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { IncorrectEmailOrPassException } from './errors/IncorrectEmailOrPass.error';
import { EmailConflictException } from './errors/EmailConflictException.error';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
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
      user = await this.usersService.createUser({
        email,
        password: hashedPassword,
        role: UserRole.PATIENT,
      });

      await this.patientsService.createPatient(
        {
          name,
          gender,
        },
        user,
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new EmailConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }

    const token = this.signToken({ id: user.id, role: user.role });

    return { token };
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;

    const user = await this.usersService.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = this.signToken({ id: user.id, role: user.role });

      return { token };
    } else {
      throw new IncorrectEmailOrPassException();
    }
  }
}
