Rails.application.routes.draw do
  # get 'places/index'
  # # get 'places/show'
  root "places#index"

  get "/api/places", to: "api/places#index"
end
