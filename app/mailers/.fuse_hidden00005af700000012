class PdfMailer < ApplicationMailer
  default from: "rsppby@gmail.com"

  def send_email(card, statement, bill, user)
    binding.pry
    attachments["Регистрационная карта.pdf"] = WickedPdf.new.pdf_from_string(card)
    attachments["Заявление.pdf"] = WickedPdf.new.pdf_from_string(statement)
    attachments["Счет.pdf"] = WickedPdf.new.pdf_from_string(bill)
    mail(to: user.email, subject: "Документы о вступлении в РСПП")
    mail(to: "rspp@rspp.by", subject: "Обращение")
  end
end
