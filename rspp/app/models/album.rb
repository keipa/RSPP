class Album < ApplicationRecord
  belongs_to :gallery
  has_many :pictures
end
