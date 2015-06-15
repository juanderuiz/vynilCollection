class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :band_id, :user_id, :title 
end
