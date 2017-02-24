class PicturesController < ApplicationController
  before_action :set_album_and_gallery
  before_action :set_picture, except: [:create]

  def index
  end

  def create
    @picture = @album.pictures.create(picture_params)
		redirect_to "#{@gallery.link}/albums/#{@album.id}"
  end

  def destroy
    @picture.destroy
    redirect_to gallery_album_path(params[:gallery_id], params[:album_id])
  end

  private

  def picture_params
    params.require(:picture).permit(:image_url)
  end

  def set_album_and_gallery
    @gallery = Gallery.find_by('smart_id' => params[:gallery_id])
    @album = @gallery.albums.find(params[:album_id])
		puts @gallery
  end

  def set_picture
    @picture = @album.pictures.find(params[:id])
  end
end
