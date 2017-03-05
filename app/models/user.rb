class User < ApplicationRecord
  has_many :topics
  has_many :news_posts
  has_many :comments
  has_many :complaints
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_presence_of :first_name, :last_name

  def name
    "#{first_name} #{last_name}"
  end

  def admin?
    role == "admin"
  end

  def voted?(survey)
    voted = false
    survey.answers.each do |answer|
      voted = true if answer.user_voted? self
    end
    voted
  end
end
