let Channel;
let Rooms = React.createClass({

  getInitialState(){
    _this = this
    Channel = App.cable.subscriptions.create('RoomChannel', {
      connected() { },
      disconnected() { },
      received(data) {
        // 接続数の更新 or メッセージの更新
        if (_message = data['message']) {
          _this.updateMessages(_message)
        } else if (_num = data['num']) {
          _this.updateNum(_num)
        }
      },
      speak(message) {
        this.perform('speak', {message: message})
      }
    })

    return {messages: this.props.messages, message: "", num: 0}
  },

  /* メッセージを投稿する */
  postMessage(e) {
    Channel.speak(this.state.message)
    this.setState({message: ""})
    e.preventDefault()
  },

  /* 接続数を更新する */
  updateNum(num) {
    this.setState({num: num})
  },

  /* メッセージ一覧を更新する */
  updateMessages(message) {
    this.setState({messages: [...this.state.messages, message]})
  },

  /* メッセージを変更する */
  changeMessage(e) {
    this.setState({message: e.target.value})
  },

  render() {
    let {messages,message,num} = this.state
    return (
      <div>
        <h1>Chat room <small>接続数: {num}</small></h1>
        {messages.map((message,index)=>{
          return <p key={index}>{message.content}</p>
        })}
        <form onSubmit={this.postMessage}>
          <label>Say something: </label>
          <input type="text" value={message} onChange={this.changeMessage} />
        </form>
      </div>
    )
  }
});