class Topic < ApplicationRecord
  belongs_to :user
  has_many :subtopics, class_name: "Topic", foreign_key: "topic_id",
    dependent: :destroy

  validates_presence_of :text
end
