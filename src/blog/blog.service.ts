import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Request,Response } from 'express';
import { CreateBlogDto } from './dto/createBlog.dto';

@Injectable()
export class BlogService {
    constructor(private prisma: DatabaseService){}

    async getBlogById(id:number,req:Request,res:Response){
        if(!id){
            return res.json({
                message:"Id should be provided!!"
            })
        }
        const blog=await this.prisma.blog.findUnique({
            where:{
                id:+id
            }
        })
        if(!blog){
            return res.status(404).json({
                message:"Blog not found!!"
            })
        }

        return res.status(200).json({
            message:"Blog fetched successfully!",
            data:blog
        })

    }

    async getAllBlogs(req:Request,res:Response){

        const blogs=await this.prisma.blog.findMany({select:{id:true,title:true,description:true}});
        if(blogs.length===0)
        {
            return res.status(404).json({
                message:"No blogs till yet!!"
            })
        }

        return res.status(200).json({
            message:"Blogs fetched successfully",
            count:blogs.length,
            data:blogs
        })

    }

    async createBlog(createblogdto:CreateBlogDto,user:{id:number},res:Response){
        const {title, description}=createblogdto
        const newBlog=await this.prisma.blog.create({
            data:{
                title,
                description,
                userId:user.id
            }
        })

        if(!newBlog)
        {
            return res.status(500).json({
                message:"Error creating the blog!!"
            })
        }

        return res.status(201).json({
            message:"New Blog added!!",
            blog:newBlog
        })
    }
}
