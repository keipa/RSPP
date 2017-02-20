class SurveysController < ApplicationController
  def vote
    binding.pry
    @survey = Survey.find(params[:id])
    @survey.update(surveys_params)
  end

  private

  def surveys_params
    params.require(:survey).permit(
      :content,
      :title,
      :closed,
      :count_votes,
      :users
    )
  end
end
