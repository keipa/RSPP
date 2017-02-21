class NewsPostsController < ApplicationController
  def show
    @post = NewsPost.find(params[:id])
  end
end
