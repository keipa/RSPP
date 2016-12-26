class TopicsController < ApplicationController

  def new
    @topic = Topic.new
  end

  def create
    Topic.create(topic_params.merge(user_id: current_user.id))
    redirect_to root_path
  end

  def edit
    @topic = Topic.find(params[:id])
  end

  def update
    @topic = Topic.find(params[:id])
    @subtopic = Topic.create(topic_params.merge(user_id: current_user.id, topic_id: @topic.id))
    redirect_to edit_topic_path(@topic)
  end

  private

  def topic_params
    params.require(:topic).permit(:text)
  end

end