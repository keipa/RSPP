class Admin::PartnersController < Admin::AdminController
  def index
    @partners = Partner.all
  end

  def destroy
    @partner = Partner.find(params[:id])
    @partner.destroy
  end

  def update
    @partner = Partner.find(params[:id])
    @partner.update(partner_params)
  end

  def create
    Partner.create(partner_params)
  end

  private

  def partner_params
    params.require(:partner).permit(:image_url, :link)
  end
end