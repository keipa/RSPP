class Admin::SurveysController < Admin::AdminController
  def index
    I18n.locale = :ru
    @surveys = Survey.all
  end

  def new
    @survey = Survey.new
  end

  def create
    users = surveys_params[:users] || ''
    content = JSON.parse surveys_params[:content]
    @survey = Survey.create!(surveys_params.merge(users: users, content: content))
    binding.pry
    redirect_to admin_surveys_path
  end

  def edit
    @survey = Survey.find(params[:id])
  end

  def update
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
        :content,
        :title,
        :active,
        :count_votes,
        :users
      )
  end
end
