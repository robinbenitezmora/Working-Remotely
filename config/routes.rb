Rails.application.routes.draw do
  # get 'places/index'
  # # get 'places/show'
  get "/api/places", to: "api/places#index"

  root "react#home"
  get "*path", to: "react#home"
end
