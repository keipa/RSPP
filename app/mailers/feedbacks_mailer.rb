class FeedbacksMailer < ApplicationMailer
  default from: "rsppby@gmail.com"

  def send_email(email: email, feedback: feedback)
    @feedback = feedback
    mail(to: email, subject: "Обращение")
  end
end
