class BandSerializer < ActiveModel::Serializer
  attributes :id, :name, :url, :user_id

  #has_many :albums, embed: :ids
end
