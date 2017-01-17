class PicturesController < ApplicationController
    before_action :set_album_and_gallery
    before_action :set_picture, except: [:create]
    def index
        @pictures = @album.pictures.all.reverse.to_a
    end

    def create
        @picture = @album.pictures.create(image_url: params[:image_url])
        @picture.save
        redirect_to gallery_album_picture_path(@gallery, @album, @picture)
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
