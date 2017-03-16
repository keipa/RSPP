class AddMainPartnerToPartners < ActiveRecord::Migration[5.0]
  def change
    add_column :partners, :main, :boolean
  end
end
