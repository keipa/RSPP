Rails.application.routes.draw do
    devise_for :users
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    root 'home#index'
    resources :galleries, only: [:index, :show, :new, :create, :edit, :update, :destroy] do
        resources :albums, only: [:index, :show, :new, :create, :edit, :update, :destroy] do
            resources :pictures
            resources :videos, only: [:new, :create, :edit, :update, :destroy]
        end
    end

    devise_scope :user do
        get '/users', to: 'devise/registrations#new'
    end

    resources :topics, only: [:new, :create, :edit, :update, :destroy]
    resources :news_posts
    resources :videos do
        resources :comments, module: :videos
    end
    resources :survey do
      member do
        put "vote" => "surveys#{vote}"
      end
    end
    resources :partners, only: [:create, :delete, :edit, :update]
end
