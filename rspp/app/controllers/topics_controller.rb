class TopicsController < ApplicationController
  before_action :set_topic, except: [:new, :create, :show, :update_content]

  def new
    @topic = Topic.new
  end

  def create
    @topic = Topic.create(
      text: topic_params[:text],
      smart_id: topic_params[:smart_id],
      user_id: current_user.id,
      link: topic_params[:link]
    )

    topic_params[:subtopics].each do |subtopic|
      @topic.subtopics.create(
        text: topic_params[:subtopics][subtopic][:text],
        user_id: current_user.id,
        link: topic_params[:subtopics][subtopic][:link]
      )
    end
    redirect_to root_path
  end

  def show
    @topic = Topic.find_by('smart_id' => params[:id])
  end

  def edit
  end

	def update_content
		@topic = Topic.find(params[:id])
		@topic.update_attributes(topic_params)
		redirect_to '/topics/' + @topic.smart_id
	end

  def update
    topic_params[:subtopics].each do |subtopic|
      @topic.subtopics.create(
        text: topic_params[:subtopics][subtopic][:text],
        user_id: current_user.id,
        link: topic_params[:subtopics][subtopic][:link]
      )
    end
    redirect_to root_path
  end

  def destroy
    @topic.destroy
    redirect_to root_path
  end

  private

  def set_topic
    @topic = Topic.find(params[:id])
  end

  def topic_params
    params.require(:topic).permit(:smart_id, :text, :description, :link, subtopics: [[:text, :link]])
  end
end
