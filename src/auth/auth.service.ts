import { BadRequestException, ForbiddenException, Injectable,  } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { cookieOptions, JWT_SECRET } from 'src/utils/constant';
import { Request,Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private prisma:DatabaseService,
        private jwt:JwtService
    ){}

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

        const newUser=await this.prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                role: role ||"EMPLOYEE"
            }

        })

        return {
            message:"user registeration was successful",
            data:newUser
        }
    }

    async login(logindto:LoginDto,req:Request,res:Response){
        const {email,password}=logindto;

        const isuserAvailable=await this.prisma.user.findFirst({
            where:{
                email
            }
        })

        if(!isuserAvailable)
        {
            throw new BadRequestException("User with email not registered yet!!")
        }
        const isPasswordCorrect=await this.comparePassword({password, hash:isuserAvailable.password})

        if(!isPasswordCorrect)
        {
            throw new BadRequestException("Invalid password!!")
        }

        const token= await this.signToken({id:isuserAvailable.id, email:isuserAvailable.email})

        if(!token)
        {
            throw new ForbiddenException()
        }

        return res
        .cookie('token',token,cookieOptions)
        .json({
            message:"User logged in succesffully!",
            token:token
        })
    }

    async logout(req:Request,res:Response){
        try {
            await res.clearCookie('token')
            return res.json({
                message:"User logged out successfully!!"
            })
        } catch (error) {
            throw new Error("Something went wrong while logging out!!")
        }
        
    }

    async hashPassword(password:string){
        const saltRound=10
        return await bcrypt.hash(password,saltRound)
       
    }

    async comparePassword(args:{password:string,hash:string})
    {
        return bcrypt.compare(args.password, args.hash);
    }
    async signToken(args:{id:number,email:string}){
        const payload=args
        return this.jwt.sign(payload,{secret:JWT_SECRET})
    }
}
