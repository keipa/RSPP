class NewsPostsController < ApplicationController
    def show
        @post = NewsPost.find(params[:id])
    end

    def new
        if can? :manage, NewsPost
            @post = NewsPost.new
        else
            redirect_to root_path
        end
    end

    def create
        if can? :manage, NewsPost
            @post = NewsPost.create(news_post_params.merge(user_id: current_user.id))
            redirect_to root_path
        else
            redirect_to root_path
        end
    end

    def edit
        if can? :manage, NewsPost
            @post = NewsPost.find(params[:id])
        else
            redirect_to root_path
        end
    end

    def update
        if can? :manage, NewsPost
            @post = NewsPost.find(params[:id])
            @post.update(news_post_params)
            redirect_to root_path
        else
            redirect_to root_path
        end
    end

    def destroy
        if can? :manage, NewsPost
            @post = NewsPost.find(params[:id])
            @post.destroy
            redirect_to root_path
        else
            redirect_to root_path
        end
    end

    private

    def news_post_params
        params.require(:news_post).permit(:title, :description, :text, :image_url)
    end
end
