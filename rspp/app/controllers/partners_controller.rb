class PartnersController < ApplicationController
  
  def create
    Partner.create(partner_params)
  end

  private

  def partner_params
    params.require(:partner).permit(:image_url, :link)
  end
end