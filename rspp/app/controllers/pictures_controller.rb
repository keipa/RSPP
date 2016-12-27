class PicturesController < ApplicationController
    before_action :set_gallery
    before_action :set_picture, except: [:create]
    def index
        @pictures = @gallery.images.all.reverse.to_a
    end

    def create
        @picture = @gallery.pictures.create(image_url: params[:image_url])
    end

    def destroy
        @picture.destroy
        redirect_to @gallery
    end

    private

    def set_gallery
        @gallery = Gallery.find(params[:gallery_id])
    end

    def set_picture
      @picture = @gallery.pictures.find(params[:id])
    end
end
