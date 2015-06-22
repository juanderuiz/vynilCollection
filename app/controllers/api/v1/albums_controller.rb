module Api
  module V1
    class AlbumsController < ApplicationController
      #skip_before_filter  :verify_authenticity_token
      before_filter :authenticate_user!
      before_action :get_band #, :get_user

      def default_serializer_options
        {root: false}
      end

      def index
        if  @band == "No band"
      	  albums = Album.limit(10).order('id DESC')
        elsif @band == "forProfile"
          albums = Album.where("user_id = ?", @userId).order('band_id ASC')
        else
          albums = @band.albums
        end
        respond_to do |format|
          format.json { render json: albums, status: 200 }
          format.xml { render xml: albums, status: 200 }
        end
      end

      def show
        album = @band.albums.find(params[:id])
        render json: album, status: 200
      end

      def create
        album = @band.albums.new(album_params)
        album.user_id = current_user.id; #Should be put as hidden in the Angular Form??
        if album.save
          #@band.increaseTotal
          render json: album, status: 201 #, location: url_for([@band, album])
        else
          render json: album.errors, status: 422
        end
      end

      def update
        #album = @band.albums.find(params[:id])
        album = Album.find(params[:id])
        album.title = album_params[:title]
        album.band_id = album_params[:band_id]
        if album.save
          render json: album, status: 200 #, location: url_for([@band, album])
        else
          render json: album.errors, status: 422
        end
      end

      def destroy
        album = @band.albums.find(params[:id])
        album.destroy
        render nothing: true, status: 204
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def get_band
          if (params[:band_id] == "NO") 
            #If there's no band id, it's searching the latest 
            @band = "No band"
          elsif (params[:band_id] == "forProfile")
            #or it's searching the albums for the user profile in params[:user_id]
            @band = "forProfile"
            @userId = params[:user_id]
          else
            @band = Band.find(params[:band_id])
          end
        end

        def get_user
          @user = User.find(params[:user_id])
        end

        def album_params
          params.require(:album).permit(:title, :band_id, :user_id)
        end
    end
  end
end