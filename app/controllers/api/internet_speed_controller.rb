module Api 
  class InternetSpeedController < ApplicationConroller

    def create
      place = Place.create!(
        name: params :place_name,
        address: params :place_address,
        city: params :place_city
      )

      speed = InternetSpeed.create!(
        place: place,
        download_speed: params[:download_speed],
        download_units: params[:download_units]
      )

      render json: { }, status: :created
    end  
  end
end
