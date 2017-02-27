class NewsPostsController < ApplicationController
  def index
			@active_news = params[:type]
			if @active_news
				@news_posts = NewsPost.all.where(post_type: params[:type])
			else
				@active_news = 'rspp'
				@news_posts = NewsPost.all.where(post_type: :rspp)
			end
  end

  def show
    @post = NewsPost.find(params[:id])
  end
end
