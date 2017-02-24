class User < ApplicationRecord
  has_many :topics
  has_many :news_posts
  has_many :comments
  has_many :complaints
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_presence_of :first_name, :last_name

  after_create :assign_default_role

  def name
    "#{first_name} #{last_name}"
  end

  def assign_default_role
    if self == User.first # TODO: fix this method
      add_role :admin
    else
      add_role :user
    end
  end
end
