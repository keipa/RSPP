class VideosController < ApplicationController
  before_action :set_album_and_gallery
  before_action :set_video, except: [:create, :new]

  def new
    @video = Video.new
  end

  def create
    @video = Video.new video_params
    @video.album_id = @album.id
    @video.save
  end

  def update
    @video.update(video_params)
    redirect_to gallery_album_path(@gallery,@album)
  end

  def destroy
    @video.destroy
    redirect_to gallery_album_path(@gallery,@album)
  end

  private

  def video_params
    params.require(:video).permit(
      :youtube_link,
      :iframe_link,
      :title,
      :description,
      :video_id,
      :published_at,
      :type_video
    )
  end

  def set_album_and_gallery
    @gallery = Gallery.find(params[:gallery_id])
    @album = @gallery.albums.find(params[:album_id])
  end

  def set_video
    @video = @album.videos.find(params[:id])
  end
end
