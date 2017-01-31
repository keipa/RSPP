class HomeController < ApplicationController
    def index
        I18n.locale = :ru
        @topics = Topic.all.where(subtopics: nil)
        @business_news = NewsPost.all.where(post_type: :business).reverse
        @rspp_news = NewsPost.all.where(post_type: :rspp).reverse
        @mass_media_news = NewsPost.all.where(post_type: :mass_media).reverse
        @videos = Video.all.where(type_video: 'interview').order('created_at desc').limit(4)
        @partners = Partner.all
        @survey = Survey.all.where(closed: false).first
    end

    def about

    end
end
