class TopicsController < ApplicationController
  def show
		@topic = Topic.find_by('smart_id' => params[:id])
		if(@topic.topic_id)
			@parent_topic = Topic.find(@topic.topic_id)
		else
			@parent_topic = @topic
		end
  end

end
