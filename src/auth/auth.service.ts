import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    private users = [
        {
            id: 1,
            username: 'admin',
            password: '123',
            role: 'admin',
        },
        {
            id: 2,
            username: 'editor',
            password: '456',
            role: 'editor',
        },
    ];

    login(username: string, password: string) {
        const user = this.users.find(
            (u) => u.username === username && u.password === password,
        );

        if (!user) {
            throw new UnauthorizedException('Usuário ou senha inválidos');
        }

        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role,
        };

        const token = this.jwtService.sign(payload);

        return {
            message: 'Login realizado com sucesso',
            access_token: token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
            },
        };
    }
}
