class SurveysController < ApplicationController
  def vote
    @survey = Survey.find(params[:id])
    @answer = Answer.find(surveys_params[:answer])
    voted_users = @answer.users
    voted_users << current_user unless voted_users.include? current_user
    @answer.update(users: voted_users)

    respond_to do |format|
      format.js {}
    end
  end

	def show
		@survey = Survey.find(params[:id])
	end

  private

  def surveys_params
    params.require(:survey).permit(
      :question,
      :active,
      :answer
    )
  end
end
