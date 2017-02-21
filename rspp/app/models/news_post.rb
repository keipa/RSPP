class NewsPost < ApplicationRecord
  belongs_to :user
  validates_presence_of :title, :text

  resourcify

  def author
    "#{user.first_name} #{user.last_name}"
  end
end
