class NewsPostsController < ApplicationController
  def index
  		@news_posts = NewsPost.all.where(post_type: params[:type])
  end

  def show
    @post = NewsPost.find(params[:id])
  end
end