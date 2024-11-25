import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRepository } from '../user/user.repository';
import { compare, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/common/typings/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async generateTokens(payload: JwtPayload) {
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      }),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const hashPassword = await hash(
      createUserDto.password,
      Number(this.configService.get('CRYPT_SALT')),
    );
    const user = await this.userRepository.createUser({
      login: createUserDto.login,
      password: hashPassword,
      refreshToken: '',
    });
    const tokens = await this.generateTokens({
      id: user.id,
      login: user.login,
    });
    const updatedUser = await this.userRepository.updateUser(user.id, {
      refreshToken: tokens.refreshToken,
      oldPassword: hashPassword,
      newPassword: hashPassword,
    });
    return updatedUser;
  }

  async signIn(signInDto: CreateUserDto) {
    const user = await this.userRepository.getUserByLogin(signInDto.login, true);
    const isMatch = await compare(signInDto.password, user.password);
    if (!user || !isMatch) {
      throw new ForbiddenException('Username or password is wrong');
    }

    const tokens = await this.generateTokens({
      id: user.id,
      login: user.login,
    });

    await this.userRepository.updateUser(user.id, {
      refreshToken: tokens.refreshToken,
      oldPassword: user.password,
      newPassword: user.password,
    });

    return tokens;
  }

  async refresh(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
    });
    const tokens = await this.generateTokens({
      id: payload.id,
      login: payload.login,
    });
    const user = await this.userRepository.getUserById(payload.id);
    await this.userRepository.updateUser(payload.id, {
      refreshToken: tokens.refreshToken,
      oldPassword: user.password,
      newPassword: user.password,
    });
    return tokens;
  }
}
