class Gallery < ApplicationRecord
  has_many :albums, dependent: :destroy
end
