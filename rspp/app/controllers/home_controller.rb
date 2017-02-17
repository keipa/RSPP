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
      render layout: false
		end

		def bill
      render layout: false
		end

		def statement
      render layout: false
		end

    def get_pdf
      require 'zip'
      binding.pry
      pdf1 = create_pdf_file("Регистрационная карта.pdf", params["registration_toPDF"])
      pdf2 = create_pdf_file("Заявление.pdf", params["statement_toPDF"])
      pdf3 = create_pdf_file("Счет.pdf", params["bill_toPDF"])

      t = Tempfile.new('tmp-zip.zip')
      Zip::File.open(t.path, Zip::File::CREATE) do |z|
        z.add("Регистрационная карта.pdf", pdf1.path)
        z.add("Заявление.pdf", pdf2.path)
        z.add("Счет.pdf", pdf3.path)
      end
      send_file t.path, type: "application/zip", filename: "Документы.zip"

      t.close
      # send_file pdf1, type: "application/pdf", disposition: "attachment"
      # send_file pdf2, type: "application/pdf", disposition: "attachment"
      # send_file pdf3, type: "application/pdf", disposition: "attachment"
    end

    def create_pdf_file(name, string)
      pdf = WickedPdf.new.pdf_from_string(string)
      pdf_file = File.new(name, "wb")
      pdf_file << pdf
      pdf_file
    end
		######### end #############
end
