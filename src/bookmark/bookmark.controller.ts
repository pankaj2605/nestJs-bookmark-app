import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Controller('bookmarks')
@UseGuards(JwtGuard)
export class BookmarkController {
    constructor(private bookmarkService:BookmarkService,){}

    @Get()
    getBookmarks(@GetUser('id') userId:number){
        return this.bookmarkService.getBookmaks(userId,);
    }

    @Get(':id')
    getBookmarkById(@GetUser('id') userId:number, @Param('id',ParseIntPipe) bookmarkId:number){
        return this.bookmarkService.getBookmarkById(
            userId,
            bookmarkId,
        );
    }

    @Post()
    createBookmark(@GetUser('id') userId:number, @Body() dto:CreateBookmarkDto,){
        return this.bookmarkService.createBookmark(userId,dto);
    }

    @Patch(':id')
    editBookmarkById(@GetUser('id') userId:number,@Param('id',ParseIntPipe) bookmarkId:number, @Body() dto:EditBookmarkDto,){
        return this.bookmarkService.editBookmarkById(userId,bookmarkId,dto);
    }

    @Delete(':id')
    deleteBookmarkById(@GetUser('id') userId:number,@Param('id',ParseIntPipe) bookmarkId:number){
        return this.bookmarkService.deleteBookmarkById(userId,bookmarkId);
    }

    

}
