class User < ApplicationRecord
    rolify
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable and :omniauthable
    devise :database_authenticatable, :registerable,
           :recoverable, :rememberable, :trackable, :validatable

    has_many :topics

    validates_presence_of :first_name, :last_name

    after_create :assign_default_role

    def assign_default_role
        @user = User.first
        @user.add_role :admin
    end
end
