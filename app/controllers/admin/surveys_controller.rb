class Admin::SurveysController < Admin::AdminController
  def index
    I18n.locale = :ru
    @surveys = Survey.all
  end

  def new
    @survey = Survey.new
  end

  def create
    @survey = Survey.create!(surveys_params)
    redirect_to admin_surveys_path
  end

  def edit
    @survey = Survey.find(params[:id])
    @answers = @survey.answers
  end

  def update
    binding.pry
    @survey = Survey.find(params[:id])
    @survey.update(surveys_params)
    redirect_to admin_surveys_path
  end

  def destroy
    @survey = Survey.find(params[:id])
    @survey.destroy
    redirect_to admin_surveys_path
  end

  private

  def surveys_params
      params.require(:survey).permit(
        :question,
        :active,
        :answer,
        answers_attributes: [:id, :text],
      )
  end
end
