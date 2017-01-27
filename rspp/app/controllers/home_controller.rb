class HomeController < ApplicationController
    def index
        @topics = Topic.all.where(subtopics: nil)
        @news = NewsPost.all.reverse
        @videos = Video.all.where(type_video: 'interview').order('created_at desc').limit(5)
        @partners = Partner.all
        @survey = Survey.all.where(closed: false).first
        gon.surveyContent = @survey
    end
end
