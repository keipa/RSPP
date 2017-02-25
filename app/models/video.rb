class Video < ApplicationRecord
  belongs_to :album

  default_scope -> { order('created_at DESC') }

  acts_as_commentable
end
