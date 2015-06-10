class UsersController < ApplicationController
  def index
    @users = {users: User.all}
  end

  def create
  end

  def update
  end

  def delete
  end
end
