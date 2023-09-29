import { Delete, ForbiddenException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma:PrismaService){}
    getBookmaks(userId:number){
        return this.prisma.bookmark.findMany({
            where:{
                userId,
            },
        });
    }
    getBookmarkById(userId:number,bookmarkId:number){
        return this.prisma.bookmark.findFirst({
            where:{
                id:bookmarkId,
                userId,
                
            },
        });
    }
    async createBookmark(userId:number,dto:CreateBookmarkDto){
        const bookmark=await this.prisma.bookmark.create({
            data:{
                userId,
                ...dto,
            },
        });
        return bookmark;
    }
    async editBookmarkById(userId:number,bookmarkId:number,dto:EditBookmarkDto){
        const bookmark =await this.prisma.bookmark.findUnique({
            where:{
                id:bookmarkId
            }
        })
        if(!bookmarkId || bookmark.userId !== userId)
            throw new ForbiddenException(
                'Access to resourse denied',
            );

            return this.prisma.bookmark.update({
                where:{
                    id:bookmarkId,

                },
                data:{
                    ...dto,
                },
            });
        
    }
    
    async deleteBookmarkById(userId:number,bookmarkId:number){
        const bookmark =await this.prisma.bookmark.findUnique({
            where:{
                id:bookmarkId
            }
        })
        if(!bookmarkId || bookmark.userId !== userId)
            throw new ForbiddenException(
                'Access to resourse denied',
            );
            await this.prisma.bookmark.delete({
                where:{
                    id:bookmarkId,
                },
            });
        }
}