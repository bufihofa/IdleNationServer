import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/entity/user.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
            private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async register(loginDto: LoginDto) {
        const existingUser = await this.userRepository.findOne({ where: { email: loginDto.email } });

        if (existingUser) {
            return {
                err: 1001,
                msg: 'Email đã được đăng ký',
            };
        }
        const hashedPassword = await bcrypt.hash(loginDto.password, 1);

        const newUser = this.userRepository.create({
            email: loginDto.email,
            password: hashedPassword, 
        });

        const finalUser = await this.userRepository.save(newUser);
        return {
            err: 0,
            msg: 'Đăng ký thành công',
            data: {
                email: finalUser.email,
                accessToken: await this.generateJwtToken(finalUser),
            },
        };
    }
    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
        if (!user) {
            return {
                err: 1002,
                msg: 'Thông tin đăng nhập không hợp lệ',
            };
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            return {
                err: 1002,
                msg: 'Thông tin đăng nhập không hợp lệ',
            };
        }
        return {
            err: 0,
            msg: 'Đăng nhập thành công',
            data: {
                email: user.email,
                accessToken: await this.generateJwtToken(user),
            },
        };
    }
    async generateJwtToken(user: User) {
        const payload = { 
            email: user.email 
        };

        return this.jwtService.signAsync(payload);
    }
}