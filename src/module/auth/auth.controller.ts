import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}



    @Post('register')
    @ApiOperation({ summary: 'Đăng ký' })
    async register(@Body() loginDto: LoginDto) {
        return this.authService.register(loginDto);
    }
    @Post('login')
    @ApiOperation({ summary: 'Đăng nhập' })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('pingAuth')
    @ApiOperation({ summary: 'Ping Auth' })
    async pingAuth(@Request() req) {
        console.log('Ping Auth:', req.user);
        return {
            err: 0,
            msg: 'Ping thành công',
            data: {
                user: req.user,
            }
        };
    }
}