class User < ActiveRecord::Base
  def attributes
    { id: id,
      username: username,
      employee_id: employee_id
    }
  end
end
