// Uses React built in factories to create elements
var UserTableHeader = React.createClass({
  render: function() {
    return DOM.thead(
      {key: 'thead'},
      DOM.tr(
        {className: 'userTableHeader'},
        DOM.th( {className: 'id'}, 'rails id'),
        DOM.th( {className: 'username'}, 'Username'),
        DOM.th( {className: 'employee-id'}, 'Employee Id'),
        DOM.th( {className: 'button-header'}, DOM.button({onClick: this.props.add}, 'Add')
        )
      )
    );
  }
});

var UserTableBody = React.createClass({
  render: function() {
    var users = this.props.users;
    var showInput = this.props.showInput;
    var update = this.props.update;
    var create = this.props.create;
    var cancel = this.props.cancel;

    var rows = $.map(users, function(user) {
      var rowInfo = {
        key: user.id,
        className: 'user-row',
        newRow: false,
        editMode: false,
        id: user.id,
        username: user.username,
        employee_id: user.employee_id,
        cancel: cancel,
        update: update
      };
      return React.createElement(UserRow, rowInfo, null);
    });
    if(showInput) {
      var inputs = {
        key: 'new-user',
        className: 'user-row',
        newRow: true,
        editMode: true,
        id: '',
        username: '',
        employee_id: '',
        cancel: cancel,
        create: create
      };
      rows.push(React.createElement(UserRow, inputs, null));
    }

    return React.createElement('tbody', {key: 'tbody'}, rows);
  }
});

var UserTable = React.createClass({
  getInitialState: function() {
    return {
      withInput: false,
      users: []
    };
  },
  componentDidMount: function () {
    this.loadUsersFromServer();
  },
  loadUsersFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function (users) {
        this.setState({users: users});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  add: function() {
    this.setState( {
      withInput: true,
      users: this.state.users
    });
  },
  cancel: function() {
    this.setState( {
      withInput: false,
      users: this.state.users
    });
  },
  create: function(user) {
    this.setState( {
      withInput: false,
    });
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {"user": user},
      success: function() {
        this.loadUsersFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  update: function(user) {
    this.setState( {
      withInput: false,
      users: this.state.users.concat(user)
    });
  },
  render: function() {
    var bodyInfo = {
      users: this.state.users,
      showInput: this.state.withInput,
      create: this.create,
      update: this.update,
      cancel: this.cancel
    };
    return(
      <table>
        <UserTableHeader add={this.add} />
        <UserTableBody {...bodyInfo} />
      </table>
    )
    // Equivalent to: 
    //return React.createElement(
    //  'table',
    //  null,
    //  React.createElement(UserTableHeader, {add: this.add}, null),
    //  React.createElement(UserTableBody, bodyInfo, null));
  }
});


