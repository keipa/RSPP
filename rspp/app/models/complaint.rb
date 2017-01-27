class Complaint < ApplicationRecord
  validates_presence_of :title, :body

  resourcify
end