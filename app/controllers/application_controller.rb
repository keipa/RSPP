class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_topics
  before_action :set_locale

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
      user_params.permit(:email, :password, :first_name, :last_name)
    end
  end

  def set_topics
    @topics = Topic.all.where(subtopics: nil)
  end

  def set_locale
    I18n.locale = :ru
  end
end
