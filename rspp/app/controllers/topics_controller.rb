class TopicsController < ApplicationController

  def new
    @topic = Topic.new
  end

  def create
    Topic.create(topic_params.merge(user_id: current_user.id))
    redirect_to root_path
  end

  private

  def topic_params
    params.require(:topic).permit(:text)
  end

end