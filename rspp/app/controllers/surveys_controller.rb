class SureysController < ApplicationController
  def new

  end

  def create
    @survey = Survey.create(surveys_params)
  end

  def vote

  end


  private

  def surveys_params
    params.require(:survey).permit(:context, :title)
  end
end
