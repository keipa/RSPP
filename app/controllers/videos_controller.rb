class VideosController < ApplicationController
  before_action :set_album_and_gallery
  before_action :set_video, except: [:create, :new]
  YOUTUBE_VIDEO_REGEX = /(https?):\/\/(www.)?youtube.com\/watch\?v=(.{8,14})/

  def new
    @video = Video.new
  end

  def create
    @video = Video.new(video_params.merge(album_id: @album.id))
    if @video.save(video_params)
      redirect_to gallery_album_path(@gallery.smart_id, @album)
    else
      redirect_to new_gallery_album_video_path(@gallery.smart_id, @album)
    end
  end

  def edit
    @video = Video.find(params[:id])
  end

  def update
    @video.update(video_params)
		redirect_to gallery_album_path(@gallery.smart_id, @album)
  end

  def destroy
    @video.destroy
    redirect_to "#{@gallery.link}/albums/#{@album.id}"
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
      :video_type
    )
  end

  def set_album_and_gallery
    @gallery = Gallery.find_by('smart_id' => params[:gallery_id])
    @galleries = Gallery.all
    @album = @gallery.albums.find(params[:album_id])
  end

  def set_video
    @video = @album.videos.find(params[:id])
  end
end
