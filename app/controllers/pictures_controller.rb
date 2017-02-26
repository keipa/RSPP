class PicturesController < ApplicationController
  before_action :set_album_and_gallery
  before_action :set_picture, except: [:create, :new]

  def index
  end

  def new
    @picture = Picture.new
  end

  def create
    if picture_params[:images]
      picture_params[:images].each do |image|
        @album.pictures.create(image: image)
      end
    end
		redirect_to gallery_album_path(@gallery.smart_id, @album.id)
  end

  def destroy
    @picture.destroy
    redirect_to gallery_album_path(params[:gallery_id], params[:album_id])
  end

  private

  def picture_params
    params.require(:picture).permit(images: [])
  end

  def set_album_and_gallery
    @gallery = Gallery.includes(:albums).find_by(smart_id: params[:gallery_id])
    @galleries = Gallery.all
    @album = @gallery.albums.find(params[:album_id])
  end

  def set_picture
    @picture = @album.pictures.find(params[:id])
  end
end
