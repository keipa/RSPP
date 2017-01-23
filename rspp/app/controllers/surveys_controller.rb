class SureysController < ApplicationController
  def new

  end

  def create

  end

  def vote

  end


  private

  def surveys_params
    params.require(:survey).permit(:context, :title)
  end
end
