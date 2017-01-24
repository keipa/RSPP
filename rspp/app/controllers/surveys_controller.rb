class SurveysController < ApplicationController
  def new

  end

  def create
    @survey = Survey.create(surveys_params)
  end

  def vote

  end


  private

  def surveys_params
    params.require(:survey).permit(:content, :title, :closed, :count_votes)
  end
end
