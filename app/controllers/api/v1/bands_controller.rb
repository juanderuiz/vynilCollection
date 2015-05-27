module Api
  module V1
    class BandsController < ApplicationController
      #skip_before_filter  :verify_authenticity_token
      before_filter :authenticate_user!#, only: [:new, :create]

      def default_serializer_options
        {root: false}
      end

      def index
      	bands = Band.all.order(name: :asc)
        render json: bands, status: 200
      end

      def show
      	band = Band.find(params[:id])
        render json: band, status: 200
      end

      def create
      	band = Band.new(band_params)
        band.user_id = current_user.id; #This should be put as hidden in the Angular Form
      	if band.save
      	  render json: band, status: 201  #location: band
      	else
      	  render json: band.errors, status: 422
      	end
      end

      def update
        #The band should be owned by the user who created
        #And only this user should be able to edit the band
        #So we have to check that current_user == band.user_id
        band = Band.find(params[:id])
        if band.update(name: band_params[:name], url: band_params[:url])
          render json: band, status: 201
        else
          render json: band.errors, status: 422
        end

      end

      def destroy
      	band = Band.find(params[:id])
      	band.destroy!
      	render nothing: true, status: 204
      end

      private
      def band_params
      	params.require(:band).permit(:name,:url,:user_id)
      end
    end
  end
end