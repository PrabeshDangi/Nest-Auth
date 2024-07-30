import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(){}

    async register(){
        return {message:"Signin was successful"}
    }

    async login(){
        return ''
    }

    async logout(){
        return ''
    }
}
