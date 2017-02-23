class Admin::AdminController < ApplicationController
  before_action :only_admin_user

  layout 'admin'

  protected

  def only_admin_user
    user = current_user || User.new
    unless user.has_role? :admin
      redirect_to root_path
    end
  end
end