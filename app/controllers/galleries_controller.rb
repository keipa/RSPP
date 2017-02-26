class GalleriesController < ApplicationController
  before_action :set_gallery, except: [:create, :new, :show]

  def show
    @galleries = Gallery.all
		@gallery = Gallery.includes(:albums).find_by(gallery_type: params[:gallery_type])
  end

  def update
    @gallery.update(gallery_params)
    redirect_to galleries_path
  end

  def destroy
    @gallery.destroy
    redirect_to galleries_path
  end

  private

  def gallery_params
    params.require(:gallery).permit(:name, :type_gallery, :smart_id, :link)
  end

  def set_gallery
    @gallery = Gallery.includes(:albums).find_by(smart_id: params[:id])
  end
end
