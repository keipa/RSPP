class CommentsController < ApplicationController
    before_action :set_user

    def create
        @comment = Comment.create(comment_params)
        @comment.user_id = current_user.id
        if @comment.save
            respond_to do |format|
                format.js
            end
        end
    end

    def destroy
    end

    def update
    end

    private

    def set_user
        @user = User.find(params[:user_id])
    end

    def comment_params
        params.require(:comment).permit(:comment)
    end
end
