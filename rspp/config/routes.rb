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

  patch 'topics/:id' => 'topics#update_content', as: 'update_content'
  resources :topics, only: [:index, :show, :new, :create, :edit, :update, :patch, :destroy]

  resources :news_posts
  resources :videos do
    resources :comments, module: :videos
  end
  resources :surveys, only: [:create, :destroy] do
    resources :comments, module: :surveys
    member do
      put 'vote' => 'surveys#vote'
      delete 'destroy' => 'surveys#destroy'
    end
  end
  resources :partners, only: [:create, :delete, :edit, :update]

  get '/about', to: 'home#about'

  resources :complaints
end
