Rails.application.routes.draw do
  resources :games do
    member do
      patch :play
      post :join
    end
    resources :messages
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
