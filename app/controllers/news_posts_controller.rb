class NewsPostsController < ApplicationController
  def index
			@post_type = params[:type] || 'rspp'
			@news_posts = NewsPost.all.where(post_type: @post_type)
  end

  def show
    @post = NewsPost.find(params[:id])
  end
end
