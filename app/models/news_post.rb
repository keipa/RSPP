class NewsPost < ApplicationRecord
  belongs_to :user

  has_attached_file :image

  default_scope -> { order('created_at DESC') }

  validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]
  validates_presence_of :title, :text

  def author
    "#{user.first_name} #{user.last_name}"
  end
end
