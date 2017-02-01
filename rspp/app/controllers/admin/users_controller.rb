class Admin::UsersController < Admin::AdminController

  def index
    I18n.locale = :ru
    @users = User.all
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to admin_users_path
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    redirect_to admin_users_path
  end

  def edit
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :role)
  end

end