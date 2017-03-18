class HomeController < ApplicationController
  def index
    @rspp_news = NewsPost.all.where(post_type: :rspp)
      .order(created_at: :desc).limit(2)
    @business_news = NewsPost.all.where(post_type: :business)
      .order(created_at: :desc).limit(2)
    @mass_media_news = NewsPost.all.where(post_type: :mass_media)
      .order(created_at: :desc).limit(3)
    @videos = Video.all.where(video_type: 'interview')
      .order(created_at: :desc).limit(4)
    @partners = Partner.all
    @main_partner = Partner.where(main: true).first
    @survey =
      Survey.all.where(active: true)&.user_not_voted(current_user)&.sample ||
      Survey.all.where(active: true)&.sample
    @slider = Slider.includes(:slides).last
    @feedback = Feedback.new
  end

  def join_rspp
  end

  def send_email_with_pdf
    card = WickedPdf.new.pdf_from_string(params["registration_toPDF_email"])
    statement = WickedPdf.new.pdf_from_string(params["statement_toPDF_email"])
    bill = WickedPdf.new.pdf_from_string(params["bill_toPDF_email"])

    PdfMailer.send_email(
      email: current_user.email,
      card: card,
      statement: statement,
      bill: bill
    ).deliver_now if user_signed_in?

    PdfMailer.send_email(
      email: "rspp@rspp.by",
      card: card,
      statement: statement,
      bill: bill
    ).deliver_now
  end

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
    pdf1 = create_pdf_file("Регистрационная карта.pdf", params["registration_toPDF"])
    pdf2 = create_pdf_file("Заявление.pdf", params["statement_toPDF"])
    pdf3 = create_pdf_file("Счет.pdf", params["bill_toPDF"])

    t = Tempfile.new('temporary.zip')
    Zip::File.open(t.path, Zip::File::CREATE) do |z|
      z.add("Регистрационная карта.pdf", pdf1.path)
      z.add("Заявление.pdf", pdf2.path)
      z.add("Счет.pdf", pdf3.path)
    end
    send_file t.path, type: "application/zip", filename: "Документы.zip"

    t.close
  end

  def create_pdf_file(name, string)
    pdf = WickedPdf.new.pdf_from_string(string)
    pdf_file = File.new(name, "wb")
    pdf_file << pdf
    pdf_file
  end
end
