class FeedbacksController < ApplicationController
  def create
    @feedback = Feedback.create(feedback_params)
    FeedbacksMailer.send_email(
      email: "rspp@rspp.by",
      feedback: @feedback
    ).deliver_now
    redirect_to root_path
  end

  private

  def feedback_params
    params.require(:feedback).permit(:name, :body, :email)
  end
end
