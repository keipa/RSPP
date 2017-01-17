Rails.application.routes.draw do
    devise_for :users
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    root 'home#index'
    resources :galleries, only: [:index, :show, :new, :create, :edit, :update, :destroy] do
        resources :albums, only: [:new, :create, :edit, :update, :destroy] do
            resources :pictures
        end
    end


    devise_scope :user do
        get '/users', to: 'devise/registrations#new'
    end

    resources :topics, only: [:new, :create, :edit, :update, :destroy]
end
