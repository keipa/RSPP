Rails.application.routes.draw do
    namespace :admin do
        root 'news_posts#index'
        resources :news_posts, only: [:index, :new, :create, :edit, :update, :destroy]
        resources :partners, only: [:index, :create, :destroy, :edit, :update]
        resources :surveys


        get 'news_posts/:post_type', to: 'news_posts#index'
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

  patch 'topics/:id' => 'topics#update_content', as: 'update_content'
  resources :topics, only: [:index, :show, :new, :create, :edit, :update, :patch, :destroy]

  resources :news_posts , only: [:show]
  resources :videos do
      resources :comments, module: :videos
  end
  resources :surveys, only: [:create, :destroy, :update] do
    resources :comments, module: :surveys
    member do
      put "vote" => "surveys#vote"
      put "update" => "surveys#update"
      delete "destroy" => "surveys#destroy"
    end
  end

  resources :complaints
end
