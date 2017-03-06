class Admin::PartnersController < Admin::AdminController
  def index
    @partners = Partner.all
    @partner = Partner.new
  end

  def destroy
    @partner = Partner.find(params[:id])
    @partner.destroy
  end

  def edit
    @partner = Partner.find(params[:id])
    respond_to do |format|
      format.js {}
    end
  end

  def update
    @partner = Partner.find(params[:id])
    @partner.update(partner_params)
    redirect_to admin_partners_path
  end

  def create
    @partner = Partner.create(partner_params)
    redirect_to admin_partners_path
  end

  private

  def partner_params
    params.require(:partner).permit(:image, :link)
  end
end
