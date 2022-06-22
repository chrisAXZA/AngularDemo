import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Bookmark } from './models/bookmark.model';
import { User } from 'src/users/models/user.model';
import { BookmarksService } from './bookmarks.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateBookmarkInput } from './dto/create-bookmark-input.dto';

// resolver will actually create new bookmarks entities
@Resolver(() => Bookmark) // will return a type of bookmark
export class BookmarksResolver {
    constructor(private readonly bookmarksService: BookmarksService) { }

    // only authenticated users should be allowed to create new Bookmarks
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Bookmark) // will return new Bookmark
    async createBookmark(
        @Args('createBookmarkData') createBookmarkData: CreateBookmarkInput,
        @CurrentUser() user: User // extracts currentUser from request object
    ) {
        return this.bookmarksService.createBookmark(createBookmarkData, user._id);
    }
}