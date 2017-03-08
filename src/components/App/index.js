// src/components/App/index.js
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import moment from 'moment';
import { getMessages, saveMessages } from '../../util/rest'

import './style.css';
import {ApiAiClient, ApiAiStreamClient} from "api-ai-javascript";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      username: '',
      message: '',
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  componentDidMount() {
    getMessages()
        .map(d => d.data)
        .subscribe(messages => this.setState({ messages }));
  }

  updateUsername(event) {
    this.setState({username: event.target.value});
  }

  updateMessage(event) {
    this.setState({message: event.target.value});
  }

  saveMessage() {
    let message = (({ username, message }) => ({ username, message }))(this.state);
    if (message.username && message.message) {
      message.timestamp = +new Date();
      saveMessages(message);
      this.setState({message: ''});
      getMessages()
          .map(d => d.data)
          .subscribe(messages => this.setState({ messages }));
    }
  }

  render() {
    const styles = {
      flexdiv: {
        display: 'flex',
      },
      flex8: {
        flex: 8,
      },
      flex7: {
        flex: 7,
      },
      flex1: {
        flex: 1,
      },
      nopadding: {
        padding: 0,
        'padding-bottom': '50px',
      },
      chatdisplay: {
        'max-height': '80%',
        padding: '0px 0px 50px',
        'overflow-y': 'scroll',
        'overflow-x': 'hidden',
      },
    };

      const client = new ApiAiClient({accessToken: 'abecb693b9c64728888f276ee1b674d0', streamClientClass: ApiAiStreamClient});
      client.textRequest('How many unresolved Tasks we had today')
          .then((response) => { console.log(response) })
          .catch((error) => { console.log(error) })

    return (
      <div id="holder">
        <AppBar
          id="header"
          title="Chat"
        />

        <Table height="600">
          <TableHeader

              adjustForCheckbox="false">
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Chat" style={{textAlign: 'center'}}>
                Chat
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The User">User</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Time">Time</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Message">Message</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>


                      {this.state.messages.map(message =>
                        <TableRow>
                          <TableRowColumn>{message.username}</TableRowColumn>
                          <TableRowColumn>{moment(message.timestamp).format('DD.MM.YYYY HH:mm')}</TableRowColumn>
                          <TableRowColumn>{message.message}</TableRowColumn>
                        </TableRow>
                      )}

          </TableBody>
        </Table>



        <div id="footer">
          <TextField
            onChange={this.updateUsername}
            value={this.state.username}
            style={styles.flex1}
            hintText="Name"
          />
          <TextField
            onChange={this.updateMessage}
            value={this.state.message}
            style={styles.flex8}
            hintText="Message"
          />
          <FlatButton

            onClick={() => this.saveMessage()}
            style={styles.flex1}
            label="Send"
            primary={true}
          />
        </div>
      </div>
    );
  }
}

export default App;
