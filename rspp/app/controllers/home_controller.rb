class HomeController < ApplicationController
  def index
    @topics = Topic.all.where(subtopics: nil)
  end
end
