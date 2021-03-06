class UsersController < ApplicationController
  ActionController::Parameters.permit_all_parameters = true

  def index
    respond_to do |format|
      format.html 
      format.json { render json: User.all }
    end
  end

  def create
    respond_to do |format|
      format.json { render json: User.create(params[:user]) }
    end
  end

  def update
    respond_to do |format|
      format.json { render json: :ok}
    end
  end

  def destroy
    User.destroy(params[:id])
    respond_to do |format|
      format.json { render json: :ok}
    end
  end
end
