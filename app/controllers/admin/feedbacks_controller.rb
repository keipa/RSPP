class Admin::FeedbacksController < Admin::AdminController
  def index
    @feedbacks = Feedback.all
  end

  def show
    @feedback = Feedback.find(params[:id])
  end

  def destroy
    Feedback.find(params[:id]).destroy
    redirect_to admin_feedbacks_path
  end
end
