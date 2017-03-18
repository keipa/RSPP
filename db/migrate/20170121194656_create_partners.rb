class CreatePartners < ActiveRecord::Migration[5.0]
  def change
    create_table :partners do |t|
      t.string :link
      t.text :description
      t.boolean :main

      t.timestamps
    end
  end
end
