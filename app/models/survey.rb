class Survey < ActiveRecord::Base
  validates_presence_of :title, :content
  acts_as_commentable
end
