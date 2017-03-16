class GalleriesController < ApplicationController
  def show
    @galleries = Gallery.all
		@gallery = Gallery.find_by(gallery_type: params[:gallery_type])
  end
end
