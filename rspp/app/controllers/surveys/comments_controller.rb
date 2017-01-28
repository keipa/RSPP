class Surveys::CommentsController < CommentsController
  before_action :set_commentable

  private

  def set_commentable
    @commentable = Survey.find(params[:survey_id])
  end

end
