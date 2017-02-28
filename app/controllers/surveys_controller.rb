class SurveysController < ApplicationController
  def vote
    @survey = Survey.find(params[:id])
    @survey.update(surveys_params)
  end

	def show
		@survey = Survey.find(params[:id])
	end

  private

  def surveys_params
    params.require(:survey).permit(
      :content,
      :title,
      :active,
      :count_votes,
      :users
    )
  end
end
