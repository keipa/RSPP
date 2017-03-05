class CreateAnswersUsersTable < ActiveRecord::Migration[5.0]
  def change
    create_table :answers_users do |t|
      t.references :answer, foreign_key: true, index: true
      t.references :user, foreign_key: true, index: true
    end
  end
end
