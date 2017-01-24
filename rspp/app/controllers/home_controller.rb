class HomeController < ApplicationController
    def index
        @topics = Topic.all.where(subtopics: nil)
        @news = NewsPost.all.reverse
        @videos = Video.all.where(type_video: 'interview').order('created_at desc').limit(5)
        @partners_unsorted = Partner.all
        @partners = []
        (0..12).each do |i|
          @partners[i] = @partners_unsorted.where(position: i)[0]
        end
        @survey = Survey.all.where(:closed => false).first
        gon.surveyContent = @survey
    end
end
