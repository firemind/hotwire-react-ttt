Rails.application.routes.draw do
  get :react, to: "react#index"
  resources :games do
    member do
      get :react
      patch :play
      post :join
    end
    resources :messages
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "games#index"
end
