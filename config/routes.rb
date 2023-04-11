Rails.application.routes.draw do
  # get 'places/index'
  # # get 'places/show'
  get "/api/places", to: "api/places#index"
  post "/api/internet_speed", to: "api/internet_speeds#create"

  root "react#home"
  get "*path", to: "react#home"
end
