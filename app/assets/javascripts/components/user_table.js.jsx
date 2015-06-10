// Uses React built in factories to create elements
var UserTableHeader = React.createClass({
  render: function() {
    return DOM.thead(
      {key: 'thead'},
      DOM.tr(
        {className: 'userTableHeader'},
        DOM.th(
          {className: 'username'},
          'Username'
        ),
        DOM.th(
          {className: 'employee-id'},
          'Employee Id'
        ),
        DOM.th(
          {className: 'employee-id'},
          DOM.button({onClick: this.props.add}, 'Add')
        )
      )
    );
  }
});

var UserTableBody = React.createClass({
  render: function() {
    var users = this.props.users;
    var showInput = this.props.showInput;
    var save = this.props.save;
    var cancel = this.props.cancel;

    var rows = $.map(users, function(user) {
      var rowInfo = {
        key: user.employeeId,
        className: 'user-row',
        newRow: false,
        editMode: false,
        username: user.username,
        employeeId: user.employeeId,
        cancel: cancel,
        save: save
      };
      return React.createElement(UserRow, rowInfo, null);
    });
    if(showInput) {
      var inputs = {
        key: 'new-user',
        className: 'user-row',
        newRow: true,
        editMode: true,
        username: '',
        employeeId: '',
        cancel: cancel,
        save: save
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
      users: this.props.users
    };
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
  save: function(user) {
    this.setState( {
      withInput: false,
      users: this.state.users.concat(user)
    });
  },
  render: function() {
    var bodyInfo = {
      users: this.state.users,
      showInput: this.state.withInput,
      save: this.save,
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


