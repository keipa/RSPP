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
    Partner.where(main: true).update_all(main: false) if partner_params[:main]
    @partner.update(partner_params)
    redirect_to admin_partners_path
  end

  def create
    Partner.where(main: true).update_all(main: false) if partner_params[:main]
    @partner = Partner.create(partner_params)
    redirect_to admin_partners_path
  end

  private

  def partner_params
    params.require(:partner).permit(:image, :link, :main, :description)
  end
end
