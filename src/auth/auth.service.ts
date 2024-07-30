import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma:DatabaseService){}

    async register(registerdto:RegisterDto){
        const{name,email,password,role}=registerdto

        const isuserAvailable=await this.prisma.user.findFirst({
            where:{
                email
            }
        })

        if(isuserAvailable){
            throw new BadRequestException('Email already registered!!')
        }
        const hashedPassword=await this.hashPassword(password)

        return {message:"user registeration was successful"}
    }

    async login(){
        return ''
    }

    async logout(){
        return ''
    }

    async hashPassword(password:string){
        const saltRound=10
        const hashedPassword=await bcrypt.hash(password,saltRound)
        return hashedPassword
    }
}
