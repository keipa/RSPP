Rails.application.routes.draw do

    namespace :admin do
        root 'news_posts#index'
        resources :news_posts, only: [:index, :new, :create, :edit, :update, :destroy]
        resources :partners, only: [:index, :create, :destroy, :edit, :update]


        get 'news_posts/:post_type', to: 'news_posts#index'
        get 'news_posts/:post_type/:id', to: 'news_posts#edit'
    end

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

    resources :news_posts , only: [:show]

    resources :videos do
        resources :comments, module: :videos
    end
    resources :surveys, only: [:create, :destroy] do
      resources :comments, module: :surveys
      member do
        put "vote" => "surveys#vote"
        delete "destroy" => "surveys#destroy"
      end
    end

    resources :complaints
end
