class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :title
      t.belongs_to :user, index: true
      t.belongs_to :band, index: true

      t.timestamps
    end
  end
end
