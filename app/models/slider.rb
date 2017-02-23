class Slider < ApplicationRecord
  has_many :slides, dependent: :destroy
end