import { GetUser, GetUserDto, JwtGuard } from '@macc4-clinic/common';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
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
  @ApiOperation({ summary: 'Sign up as patient' })
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
    description: 'Returns the jwt token',
  })
  @ApiUnauthorizedResponse({
    description: 'Returns Unauthorized if input data is invalid',
  })
  signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(signInDto);
  }

  //
  // Change password
  //

  @Post('/password/change')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Change password' })
  @ApiBearerAuth()
  async changePassword(
    @GetUser() user: GetUserDto,
    @Body() dto: ChangePasswordDto,
  ): Promise<void> {
    await this.authService.changePassword(user, dto);
  }
}
