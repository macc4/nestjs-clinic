import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //
  // Sign up as patient
  //

  @Post('/signup')
  @ApiOperation({ summary: 'Sign in as patient' })
  @ApiCreatedResponse({
    description: 'Returns the jwt token',
  })
  @ApiConflictResponse({
    description: 'Returns Conflict if user already exists',
  })
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  //
  // Sign in
  //

  @Post('/signin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({
    status: 200,
    description: 'Returns the jwt token',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Returns Not Unauthorized if input data is invalid',
  })
  signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(signInDto);
  }
}
