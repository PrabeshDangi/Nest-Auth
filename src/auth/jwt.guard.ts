import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
      return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
          throw new UnauthorizedException('You must be logged in to create a blog');
        }
        return user;
      }
  
    getRequest(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      return request;
    }
  }