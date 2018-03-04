class AlbumsController < ApplicationController
  before_action :set_gallery, except: [:create, :new]

  before_action :set_album, except: [:create, :new]
  skip_before_action :verify_authenticity_token, only: [:create, :update, :edit]

  def new
    @album = Album.new
  end

  def create
    @gallery.albums.create(album_params)
    redirect_to gallery_path(@gallery.smart_id)
  end

  def update
    @album.update(album_params)
    redirect_to gallery_path(@gallery.smart_id)
  end

  def show
    if @album.videos.any?
      @videos = @album.videos.page(params[:page])
    elsif @album.pictures.any?
      @pictures = @album.pictures
    end
  end

  def destroy
    @album.destroy
    redirect_to gallery_path(@gallery.smart_id)
  end

  private

  def set_gallery
    @gallery = Gallery.includes(:albums).find_by(smart_id: params[:gallery_id])
    @galleries = Gallery.includes(:albums).all
  end

  def set_album
    @album = @gallery.albums&.includes(videos: [:comments]).find(params[:id])
  end

  def album_params
    params.require(:album).permit(:name, :description)
  end
end
