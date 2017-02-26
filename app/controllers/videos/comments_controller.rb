class Videos::CommentsController < CommentsController
  before_action :set_commentable

  private

  def set_commentable
    @commentable = Video.includes(:comments).find(params[:video_id])
  end

end
