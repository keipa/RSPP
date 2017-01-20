class PicturesController < ApplicationController
    before_action :set_album_and_gallery
    before_action :set_picture, except: [:create]
    def index
    end

    def create
        @picture = @album.pictures.create(image_url: params[:image_url])
    end

    def destroy
        @picture.destroy
        redirect_to @album
    end

    private

    def set_album_and_gallery
        @gallery = Gallery.find(params[:gallery_id])
        @album = @gallery.albums.find(params[:album_id])
    end

    def set_picture
      @picture = @album.pictures.find(params[:id])
    end
end
