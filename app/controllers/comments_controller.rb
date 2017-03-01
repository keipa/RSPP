class CommentsController < ApplicationController
  def create
    @comment = @commentable.comments.new(comment_params)
    @comment.user_id = current_user.id
    @comment.save

    respond_to do |format|
      format.js {}
    end
  end

  def destroy
    @comment = Comment.all.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.js {}
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:comment)
  end
end
