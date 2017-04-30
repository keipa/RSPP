class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    if user.admin?
      can :manage, :all
    elsif user.role == 'user'
      can :manage, Comment, user_id: user.id
      can :create, Feedback, user_id: user.id
      can :read, :all
    else
      can :read, :all
    end
  end
end
