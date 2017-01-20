class Video < ApplicationRecord
    belongs_to :album
    acts_as_commentable
end
