class GalleriesController < ApplicationController
  before_action :set_gallery, except: [:create, :new, :index]

  def index
    @galleries = Gallery.all
		redirect_to @galleries[0].link
  end

  def new
    @gallery = Gallery.new
  end

  def create
    @gallery = Gallery.create(gallery_params)
    redirect_to galleries_path
  end

  def show
		@galleries = Gallery.all
		@albums = @gallery.albums.includes(:albums)
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
    @gallery = Gallery.find_by(smart_id: params[:id])
  end
end
