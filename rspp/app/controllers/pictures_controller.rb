class PicturesController < ApplicationController
    before_action :set_gallery
    def index
        @pictures = @gallery.images.all.reverse.to_a
    end

    def create
        @picture = @gallery.pictures.create(image_url: params[:image_url])
    end

    private

    def set_gallery
        @gallery = Gallery.find(params[:gallery_id])
    end
end
