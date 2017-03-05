class Survey < ApplicationRecord
  has_many :answers

  accepts_nested_attributes_for :answers

  validates_presence_of :question

  scope :user_not_voted, lambda { |user|
    return if user.nil?
    surveys = []
    all.each do |survey|
      unless user.voted? survey
        surveys << survey
        return
      end
    end
    surveys
  }

  acts_as_commentable

  def users_voted
    answers.inject(0) { |result, answer| result += answer.users_voted }
  end

  def answers_percents
    all_percents = []
    answers.each do |answer|
      all_percents << answer.in_percents
    end
    all_percents
  end
end
