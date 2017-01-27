class ComplaintsController < ApplicationController

  def index
    if can? :manage, Complaint
      @complaints = Complaint.all
    else
      redirect_to root_path
    end
  end

  def show
    if can? :manage, Complaint
      @complaint = Complaint.find(params[:id])
    else
      redirect_to root_path
    end
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