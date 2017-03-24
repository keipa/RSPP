class Admin::AnswersController < Admin::AdminController
  def destroy
    Answer.find(params[:id]).destroy
  end
end
