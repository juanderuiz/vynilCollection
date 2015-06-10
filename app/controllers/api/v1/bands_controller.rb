module Api
  module V1
    class BandsController < ApplicationController
      #skip_before_filter  :verify_authenticity_token
      before_filter :authenticate_user!, :get_user_id #, only: [:new, :create]

      def default_serializer_options
        {root: false}
      end

      def index
        if @userProfileId
          bands = Band.where("user_id = ?", @userProfileId).order('name ASC')
          render json: bands, status: 200
        else
      	  bands = Band.all.order(name: :asc)
          render json: bands, status: 200
        end
      end

      def show
      	band = Band.find(params[:id])
        render json: band, status: 200
      end

      def create
      	band = Band.new(band_params)
        band.user_id = current_user.id; #Should be put as hidden in the Angular Form??
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

      def get_user_id
        @userProfileId = params[:user_id] ? params[:user_id] : nil
      end
      def band_params
      	params.require(:band).permit(:name,:url,:user_id)
      end
    end
  end
end