class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel"
    ActionCable.server.broadcast 'room_channel', num: ActionCable.server.connections.length
  end

  def unsubscribed
    ActionCable.server.broadcast 'room_channel', num: ActionCable.server.connections.length
  end

  def speak(data)
    Message.create! content: data['message']
  end
end
