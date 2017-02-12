class HomeController < ApplicationController
    def index
        I18n.locale = :ru
        @business_news = NewsPost.all.where(post_type: :business).reverse
        @rspp_news = NewsPost.all.where(post_type: :rspp).reverse
        @mass_media_news = NewsPost.all.where(post_type: :mass_media).reverse
        @videos = Video.all.where(type_video: 'interview').order('created_at desc').limit(4)
        @partners = Partner.all
        @survey = Survey.all.where(closed: false).first
        @slider = Slider.includes(:slides).last
    end

		def join_rspp

		end

		####### goddam fucking shit ######
		def registration_card
      # respond_to do |format|
      #   format.html
      #   format.pdf do
      #     pdf = WickedPdf.new.pdf_from_url("#{request.base_url}#{registration_card_path}")
      #     send_data pdf
      #   end
			# end
		end

		def bill
      # respond_to do |format|
      #   format.html
      #   format.pdf do
      #     pdf = WickedPdf.new.pdf_from_url("#{request.base_url}#{bill_path}")
      #     send_data pdf
      #   end
      # end
		end

		def statement
      respond_to do |format|
        format.html
        format.pdf do
          pdf = WickedPdf.new.pdf_from_url("#{request.base_url}#{statement_path}")
          send_data pdf
        end
      end
		end
		######### end #############
end
