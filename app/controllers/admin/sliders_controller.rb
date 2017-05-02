class Admin::SlidersController < Admin::AdminController
  def index
    I18n.locale = :ru
    @sliders = Slider.includes(:slides).all
  end

  def show
    @slider = Slider.find(params[:id])
  end

  def new
    @slider = Slider.new
  end

  def create
    binding.pry
    @slider = Slider.create(name: slider_params[:name])
    slider_params[:slides].each_with_index do |slide, index|
      @slider.slides.create(
        text: slider_params[:slides][index.to_s][:text],
        image: slider_params[:slides][index.to_s][:image]
      )
    end

    redirect_to admin_sliders_path
  end

  def edit
    @slider = Slider.find(params[:id])
  end

  def update
    binding.pry
    @slider = Slider.find(params[:id])
    @slider.update(name: slider_params[:name])
    slider_params[:slides].each_with_index do |slide, index|
      if @slider.slides[index]
        @slider.slides[index].update(
          text: slider_params[:slides][index.to_s][:text],
          image: slider_params[:slides][index.to_s][:image]
        )
      else
        @slider.slides.create(
          text: slider_params[:slides][index.to_s][:text],
          image: slider_params[:slides][index.to_s][:image]
        )
      end
    end
    redirect_to admin_sliders_path
  end

  def destroy
    @slider = Slider.find(params[:id])
    @slider.destroy
    redirect_to admin_sliders_path
  end

  private

  def slider_params
    params.require(:slider).permit(:name, slides: [:text, :image])
  end
end
