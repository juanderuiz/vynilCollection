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
      	if band.save
      	  render json: band, status: 201, location: band
      	else
      	  render json: band.errors, status: 422
      	end
      end

      def update
      end

      def destroy
      	band = Band.find(params[:id])
      	band.destroy!
      	render nothing: true, status: 204
      end

      private
      def band_params
      	params.require(:band).permit(:name,:url)
      end
    end
  end
end