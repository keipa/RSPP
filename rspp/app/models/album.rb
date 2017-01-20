class Album < ApplicationRecord
  belongs_to :gallery
  has_many :pictures, dependent: :destroy
  has_many :videos, dependent: :destroy
end
