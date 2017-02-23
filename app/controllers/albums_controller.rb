class AlbumsController < ApplicationController
  before_action :set_gallery
  before_action :set_album, except: [:create, :new, :index, :show]
  skip_before_action :verify_authenticity_token, only: [:create, :update, :edit]

  def index
    @albums = @gallery.albums.all.reverse.to_a
  end

  def create
    @album = @gallery.albums.create(album_params)
    redirect_to @gallery.link
  end

  def show
    @album = @gallery.albums.find(params[:id])
    @videos = @album.videos.includes(:comments)
                    .paginate(page: params[:page], per_page: 7).order(created_at: :desc)
  end

  def update
    @album.update(album_params)
		redirect_to @gallery.link
  end

  def edit
  end

  def destroy
    @album.destroy
    redirect_to @gallery.link
  end

  private

  def set_gallery
    @gallery = Gallery.find_by('smart_id' => params[:gallery_id])
  end

  def set_album
    @album = @gallery.albums.find(params[:id])
  end

  def album_params
    params.require(:album).permit(:name, :description)
  end
end
