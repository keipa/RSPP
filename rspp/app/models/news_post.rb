class NewsPost < ApplicationRecord
  belongs_to :user
  validates_presence_of :title, :description, :text
end