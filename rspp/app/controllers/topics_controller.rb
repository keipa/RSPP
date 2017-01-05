class TopicsController < ApplicationController

  def new
    @topic = Topic.new
  end

  def create
    @topic = Topic.create(text: topic_params[:text], user_id: current_user.id)
    topic_params[:subtopics].each do |subtopic|
      @topic.subtopics.create(text: topic_params[:subtopics][subtopic][:subtopic_name], user_id: current_user.id)
    end
    redirect_to root_path
  end

  def edit
    @topic = Topic.find(params[:id])
  end

  def update
    @topic = Topic.find(params[:id])
    topic_params[:subtopics].each do |subtopic|
      @topic.subtopics.create(text: topic_params[:subtopics][subtopic][:subtopic_name], user_id: current_user.id)
    end
    redirect_to root_path
  end

  def destroy
    @topic = Topic.find(params[:id])
    @topic.destroy
    redirect_to root_path
  end

  private

  def topic_params
    params.require(:topic).permit(:text, subtopics: [[:subtopic_name, :subtopic_link]])
  end

end