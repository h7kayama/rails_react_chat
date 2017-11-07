let Channel;

let Rooms = React.createClass({
  getInitialState(){
    console.log("call Rooms#getInitialState")

    _this = this
    Channel = App.cable.subscriptions.create('RoomChannel', {
      connected() { console.log("call Rooms#connected") },
      disconnected() { console.log("call Rooms#disconnected") },
      received(data) {
        console.log("call Rooms#received")
        _this.updateMessages(data['message'])
      },
      speak(message) {
        this.perform('speak', {message: message})
      }
    })

    return {messages: this.props.messages, content: ""}
  },

  speak(e) {
    console.log("call Rooms#speak")
    Channel.speak(this.state.content)
    this.setState({content: ""})
    e.preventDefault()
  },

  updateMessages(message) {
    console.log("call Rooms#updateMessages")
    this.setState({messages: [...this.state.messages, message]})
  },

  changeContent(e) {
    console.log("call Rooms#changeContent")
    this.setState({content: e.target.value})
  },

  render() {
    console.log("call Rooms#render")
    let {messages,content} = this.state
    return (
      <div>
        <h1>Chat room</h1>
        {messages.map((message,index)=>{
          return <p key={index}>{message.content}</p>
        })}
        <form onSubmit={this.speak}>
          <label>Say something:</label>
          <input type="text" value={content} onChange={this.changeContent} />
        </form>
      </div>
    )
  }
});