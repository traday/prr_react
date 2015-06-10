class UsersController < ApplicationController

  def index
    respond_to do |format|
      format.html 
      format.json { render json: User.all }
    end
  end

  def create
  end

  def update
  end

  def delete
  end
end
