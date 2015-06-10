var DOM = React.DOM;

var UserRow = React.createClass({
  getInitialState: function() {
    var eIdRefName = this.props.newRow ? 'newEmployeeId' : 'eId'+this.props.employeeId;
    var userRefName = this.props.newRow ? 'newUsername' : 'user'+this.props.employeeId;
    return {
      newRow: this.props.newRow,
      editMode: this.props.editMode,
      username: this.props.username,
      employeeId: this.props.employeeId,
      userRefName: userRefName,
      eIdRefName: eIdRefName,
    };
  },

  cancel: function() {
    if(this.state.newRow) {
      this.props.cancel();
    } else {
      this.setState({editMode: false});
    }
  },

  save: function() {
    if(this.state.newRow) {
      this.props.save({
        username: React.findDOMNode(this.refs.newUsername).value,
        employeeId: React.findDOMNode(this.refs.newEmployeeId).value
      });
    } else {
      this.setState({
        editMode: false,
        username: React.findDOMNode(this.refs[this.state.userRefName]).value,
        employeeId: React.findDOMNode(this.refs[this.state.eIdRefName]).value
      });
    }
  },

  edit: function() {
    this.setState({editMode: true});
  },

  render: function() {
    if(this.state.editMode) {
      return React.createElement(
        'tr',
        {className: 'userRow'},
        React.createElement(
          'td',
          {className: 'username'},
          DOM.input({type: 'text', ref: this.state.userRefName, placeholder: 'Username', defaultValue: this.state.username})
        ),
        React.createElement(
          'td',
          {className: 'employee-id'},
          DOM.input({type: 'text', ref: this.state.eIdRefName, placeholder: 'Employee Id', defaultValue: this.state.employeeId})
        ),
        React.createElement(
          'td',
          {className: 'button'},
          DOM.button({onClick: this.cancel}, 'Cancel'),
          DOM.button({onClick: this.save}, 'Save')
        )
      );
    } else {
      return React.createElement(
        'tr',
        {className: 'userRow'},
        React.createElement(
          'td',
          {className: 'username'},
          this.state.username
        ),
        React.createElement(
          'td',
          {className: 'employee-id'},
          this.state.employeeId
        ),
        React.createElement(
          'td',
          {className: 'button'},
          DOM.button({onClick: this.edit}, 'Edit')
        )
      );
    }
  }
});
