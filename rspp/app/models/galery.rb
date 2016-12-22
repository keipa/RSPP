class Galery < ApplicationRecord
    has_many :pictures, :dependent => :destroy

end
