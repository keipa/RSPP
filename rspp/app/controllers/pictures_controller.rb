class PicturesController < ApplicationController
    before_action :set_album_and_gallery
    before_action :set_picture, except: [:create]
    def index
    end

    def create
        @picture = @album.pictures.create(picture_params)
    end

    def destroy
        @picture.destroy
    end

    private

    def picture_params
        params.require(:picture).permit(:image_url)
    end

    def set_album_and_gallery
        @gallery = Gallery.find(params[:gallery_id])
        @album = @gallery.albums.find(params[:album_id])
    end

    def set_picture
        @picture = @album.pictures.find(params[:id])
    end
end
