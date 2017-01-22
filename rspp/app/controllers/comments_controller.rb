class CommentsController < ApplicationController
    def create
        @comment = @commentable.comments.new comment_params
        @comment.user_id = current_user.id
        @comment.user_name = current_user.first_name
        @comment.save
        respond_to do |format|
          format.js
        end
    end

    def destroy
    end

    def update
    end

    private


    def comment_params
        params.require(:comment).permit(:comment)
    end
end
