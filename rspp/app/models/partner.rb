class Partner < ApplicationRecord
  validates_presence_of :image_url

  resourcify
end

