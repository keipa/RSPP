class Admin::SurveysController < Admin::AdminController

    def index
      I18n.locale = :ru
      @surveys = Survey.all
    end

    def create
      @survey = Survey.create(surveys_params)
      redirect_to admin_surveys_path
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
        params.require(:survey).permit(:content, :title, :closed, :count_votes, :users)
    end
end