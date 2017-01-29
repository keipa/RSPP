class SurveysController < ApplicationController
    def new
    end

    def create
        @survey = Survey.create(surveys_params)
        respond_to do |format|
            format.js
        end
    end

    def vote
        @survey = Survey.find(params[:id])
        @survey.update_attributes(surveys_params)
    end

    def update
        @survey = Survey.find(params[:id])
        @survey.update_attributes(surveys_params)
    end

    def destroy
        @survey = Survey.find(params[:id])
        @survey.destroy
        respond_to do |format|
            format.js
        end
    end

    private

    def surveys_params
        params.require(:survey).permit(:content, :title, :closed, :count_votes, :users)
    end
end
