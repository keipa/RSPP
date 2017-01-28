class CreateComplaints < ActiveRecord::Migration[5.0]
  def change
    create_table :complaints do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.references :user, foreign_key: true
    end
  end
end
