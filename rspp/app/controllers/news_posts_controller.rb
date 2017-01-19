class NewsPostsController < ApplicationController
  def show
    @post = NewsPost.find(params[:id])
  end

  def new
    @post = NewsPost.new
  end

  def create
    @post = NewsPost.create(news_post_params.merge(user_id: current_user.id))
    redirect_to root_path
  end

  private

  def news_post_params
    params.require(:news_post).permit(:title, :description, :text, :image_url)
  end
end