class Admin::TopicsController < Admin::AdminController
  before_action :set_topic, except: [:index, :new, :create]

  def index
    @topics = Topic.all
  end

  def new
    if params[:parent_topic_id]
      @parent_topic = Topic.find(params[:parent_topic_id])
    end
    @topic = Topic.new
  end

  def create
    @topic = Topic.create(
      text: topic_params[:text],
      smart_id: topic_params[:smart_id],
      description: topic_params[:description],
      topic_id: topic_params[:topic_id],
      user_id: current_user.id
    )
    redirect_to admin_topics_path
  end

  def edit
    if params[:parent_topic_id]
      @parent_topic = Topic.find(params[:parent_topic_id])
  	end
  end

  def update
    @topic.update_attributes(topic_params)
    redirect_to admin_topics_path
  end

  def destroy
    @topic.destroy
    redirect_to admin_topics_path
  end

  private

  def set_topic
    @topic = Topic.find(params[:id])
  end

  def topic_params
    params.require(:topic).permit(
      :smart_id,
      :text,
      :topic_id,
      :description
    )
    end
end
