class Answer < ApplicationRecord
  belongs_to :survey
  has_and_belongs_to_many :users

  def users_voted
    users.size
  end

  def in_percents
    if survey.users_voted.to_f > 0
      sprintf('%.2f', users_voted * 100 / survey.users_voted.to_f)
    else
      "0.00"
    end
  end

  def user_voted?(user)
    users.include? user
  end
end
