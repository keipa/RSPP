class PdfMailer < ApplicationMailer
  default from: "rsppby@gmail.com"

  def send_email(email: email,
                 card: card,
                 statement: statement,
                 bill: bill)
    attachments["Регистрационная карта.pdf"] = card
    attachments["Заявление.pdf"] = statement
    attachments["Счет.pdf"] = bill
    mail(to: email, subject: "Документы о вступлении в РСПП")
  end
end
