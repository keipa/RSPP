class ComplaintsController < ApplicationController

  def index
    @complaints = Complaint.all
  end

  def show
    I18n.locale = :ru
    @complaint = Complaint.includes(:user).find(params[:id])
  end

  def new
    @complaint = Complaint.new
  end

  def create
    Complaint.create(complaint_params.merge(user_id: current_user.id))
    redirect_to root_path
  end

  private

  def complaint_params
    params.require(:complaint).permit(:title, :body)
  end
end
