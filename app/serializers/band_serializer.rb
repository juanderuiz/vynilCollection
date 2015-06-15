class BandSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id

  has_many :albums, embed: :ids
end
