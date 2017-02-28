class Admin::TopicsController < Admin::AdminController
	def index
		@topics = Topic.all
	end

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
        smart_id: topic_params[:subtopics][subtopic][:smart_id],
        link: topic_params[:subtopics][subtopic][:link]
      )
    end
    redirect_to root_path
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
        link: topic_params[:subtopics][subtopic][:link],
        smart_id: topic_params[:subtopics][subtopic][:smart_id]
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
    params.require(:topic).permit(
      :smart_id,
      :text,
      :description,
      :link,
      subtopics: [
        [:text, :link, :smart_id]
      ]
    )
    end
end
