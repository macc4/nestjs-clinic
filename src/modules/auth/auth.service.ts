import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../users/enums/user-role.enum';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from '../users/users.service';
import { IncorrectEmailOrPassException } from './errors/IncorrectEmailOrPass.error';
import { EmailConflictException } from './errors/EmailConflictException.error';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  //
  // Sign up as patient
  //

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const userExists = await this.usersService.getUserByEmail(signUpDto.email);

    if (userExists) {
      throw new EmailConflictException();
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(signUpDto.password, salt);

    const defaultRoles = [UserRole.PATIENT];

    const user = await this.usersService.createUser({
      hashedPassword,
      roles: defaultRoles,
      ...signUpDto,
    });

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }

  //
  // Sign in
  //

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;

    const user = await this.usersService.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = this.jwtService.sign({ id: user.id });

      return { token };
    } else {
      throw new IncorrectEmailOrPassException();
    }
  }
}
