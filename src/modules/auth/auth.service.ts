import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { UserRole } from '../users/enums/user-role.enum';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { IncorrectEmailOrPassException } from './errors/IncorrectEmailOrPass.error';
import { EmailConflictException } from './errors/EmailConflictException.error';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  signToken(payload: JwtPayloadDto): string {
    return this.jwtService.sign(payload);
  }

  // signing up is only for patients
  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    let user: User;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(signUpDto.password, salt);

    const defaultRoles = [UserRole.PATIENT];

    try {
      user = await this.usersService.createUser({
        hashedPassword,
        roles: defaultRoles,
        ...signUpDto,
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new EmailConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }

    const token = this.signToken({ id: user.id });

    return { token };
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;

    const user = await this.usersService.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = this.signToken({ id: user.id });

      return { token };
    } else {
      throw new IncorrectEmailOrPassException();
    }
  }
}
