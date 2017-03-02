class Admin::TopicsController < Admin::AdminController
  before_action :set_topic, except: [:index, :new, :create]

  def index
    @topics = Topic.all
  end

  def new
    @parent_topic =
      Topic.find(params[:parent_topic_id]) if params[:parent_topic_id]
    @topic = Topic.new
  end

  def create
    @topic = Topic.create(topic_params.merge(user_id: current_user.id))
    redirect_to admin_topics_path
  end

  def edit
    @parent_topic =
      Topic.find(params[:parent_topic_id]) if params[:parent_topic_id]
  end

  def update
    @topic.update(topic_params)
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
