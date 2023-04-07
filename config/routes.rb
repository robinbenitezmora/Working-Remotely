Rails.application.routes.draw do
  # get 'places/index'
  # # get 'places/show'
  root "places#index"

  get "/api/places", to: "api/places#index"
  get "/new-internet-speed", to: "internet_speeds#new"
end
