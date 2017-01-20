class HomeController < ApplicationController
  def index
    @topics = Topic.all.where(subtopics: nil)
    @news = NewsPost.all.reverse
  end
end
