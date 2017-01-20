class VideosController < ApplicationController
    before_action :set_album_and_gallery
    before_action :set_video, except: [:create, :new]

    def new
        @video = Video.new
     end

    def create
        @video = Video.create(:youtube_link => params['youtube_link'], :iframe_link => params['iframe_link'],
        :title => params['title'], :published_at => params['published_at'], :description => params['description'],
        :type_video => params['type_video'], :video_id => params['video_id'], :album_id => @album.id)
    end

    def update
        @video.update_attributes(video_params)
    end

    def destroy
        @video.destroy
        redirect_to @album
    end

    private
    def video_params
        params.require(:video).permit(:youtube_link, :iframe_link, :title, :description, :video_id, :published_at,:type_video)
    end

    def set_album_and_gallery
        @gallery = Gallery.find(params[:gallery_id])
        @album = @gallery.albums.find(params[:album_id])
    end

    def set_video
        @video = @album.videos.find(params[:id])
    end
end
