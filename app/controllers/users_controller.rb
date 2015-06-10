class UsersController < ApplicationController
  def index
    @users = {
      users:
      [{username: 'tom', employeeId: '1'},
       {username: 'jane', employeeId: '2'}]
    }
  end

  def create
  end

  def update
  end

  def delete
  end
end
