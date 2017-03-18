class PdfMailer < ApplicationMailer
  default from: "rsppby@gmail.com"

  def send_email(email: email,
                 card: card,
                 statement: statement,
                 bill: bill)
    attachments["Регистрационная карта.pdf"] = WickedPdf.new.pdf_from_string(card)
    attachments["Заявление.pdf"] = WickedPdf.new.pdf_from_string(statement)
    attachments["Счет.pdf"] = WickedPdf.new.pdf_from_string(bill)
    mail(to: email, subject: "Документы о вступлении в РСПП")
  end
end
