import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@macc4-clinic/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from '../users/users.service';
import { IncorrectEmailOrPassException } from './errors/IncorrectEmailOrPass.error';
import { EmailConflictException } from './errors/EmailConflictException.error';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  //
  // Sign up as patient
  //

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    let userExists: User;

    try {
      userExists = await this.usersService.getUserByEmail(signUpDto.email);
    } catch {}

    if (userExists) {
      throw new EmailConflictException();
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(signUpDto.password, salt);

    const defaultUserRoles = [UserRole.PATIENT];

    const user = await this.usersService.createUser({
      hashedPassword,
      roles: defaultUserRoles,
      ...signUpDto,
    });

    const token = this.jwtService.sign({
      id: user.id,
      roles: defaultUserRoles,
    });

    return { token };
  }

  //
  // Sign in
  //

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;

    const user = await this.usersService.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const roles = user.roles.map((role) => role.title);

      const token = this.jwtService.sign({ id: user.id, roles });

      return { token };
    } else {
      throw new IncorrectEmailOrPassException();
    }
  }
}
