class GalleriesController < ApplicationController
  before_action :set_gallery, except: [:create, :new, :index]
  def index
      @galleries = Gallery.all
  end

  def new
      @gallery = Gallery.new
  end

  def create
      @gallery = Gallery.create(gallery_params)
      @gallery.save
      redirect_to galleries_path
  end

  def show
  end

  def update
      @gallery.update_attributes(gallery_params)
  end

  def destroy
    @gallery.destroy
    redirect_to galleries_path
  end

  private

  def gallery_params
    params.require(:gallery).permit(:name,:type_gallery)
  end

  def set_gallery
      @gallery = Gallery.find(params[:id])
  end

end
