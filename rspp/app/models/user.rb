class User < ApplicationRecord
    rolify
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable and :omniauthable
    devise :database_authenticatable, :registerable,
           :recoverable, :rememberable, :trackable, :validatable

    has_many :topics
    has_many :news_posts

    validates_presence_of :first_name, :last_name

    after_create :assign_default_role

    def assign_default_role
        if self == User.first # TODO: fix this method
            add_role :admin
        else
            add_role :user
        end
    end
end
