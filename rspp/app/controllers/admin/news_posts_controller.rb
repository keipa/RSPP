class Admin::NewsPostsController < Admin::AdminController

  def index
    I18n.locale = :ru
    post_type = params[:post_type] || :rspp
    @news_posts = NewsPost.all.where(post_type: post_type)
  end

  def new
    @post = NewsPost.new
  end

  def create
    @post = NewsPost.create(news_post_params.merge(user_id: current_user.id))
    redirect_to admin_news_posts_path
  end

  def edit
    @post = NewsPost.find(params[:id])
  end

  def update
    @post = NewsPost.find(params[:id])
    @post.update(news_post_params)
    redirect_to admin_news_posts_path
  end

  def destroy
    @post = NewsPost.find(params[:id])
    @post.destroy
    redirect_to admin_news_posts_path
  end

  private

  def news_post_params
    params.require(:news_post).permit(:title, :description, :text, :image_url, :post_type)
  end

end