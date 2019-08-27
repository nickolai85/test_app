<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MessageChannelController extends Controller
{
    public function chatList()
    {
        $channels = Channel::where('sender_id', auth()->id())->orWhere('receiver_id',auth()->id())->get();
        $array_channelsIds = [];
        foreach ($channels as $key => $channel) {
            $array_channelsIds[] = $channel->id;
        }
        $messages = Message::whereIn('channel_id', $array_channelsIds)
            ->with(['channel.sender','channel.receiver', 'sender'])
            ->latest()->get();
        $newMessages = collect(new MessageCollection($messages))->groupBy('channelID');
        $allmessages = [];
        foreach ($newMessages  as $key => $groupMessage) {
            $allmessages[] = $groupMessage[0];
        }
        return response()->json(['data'=> $allmessages],200);
    }
    public function toArray($request)
    {
        $userID = auth()->id();
        $images = json_decode($this->images);
        $new_images = [];
        if (isset($images) and count($images)) {
            foreach ($images as $image) {
                array_push($new_images, Storage::url($image));
            }
        }
        $otherUserName = null;
        if ($userID == $this->channel->sender_id) {
            $user = $this->channel->receiver;
        }else {
            $user = $this->channel->sender;
        }
        $otherUserName = $user->name;
        return [
            'created_at' => $this->created_at,
            'message' => $this->message,
            'images' => $new_images,
            'firstKey' => strtoupper(str_split($user->name)[0]),
            'myFirstKey' => strtoupper(str_split(auth()->user()->name)[0]),
            'myId' => auth()->id(),
            'sender_id' => $this->sender_id,
            'myName' =>  auth()->user()->name,
            'otherUserName' => $otherUserName,
            'channelID' => $this->channel_id
        ];
    }
    public function messages($channelId)
    {
        $messages = Message::where('channel_id', $channelId)
            ->with(['channel.sender','channel.receiver', 'sender'])
            ->get();
        return ewMessageCollection($messages);
    }
    public function send_message($channelID, Request$r)
    {
        if (!$r->message and count($r->images) == 0) {
            return response()->json(['message'=> 'no message or images found'],400);
        }
        $images_url = [];
        if (isset($r->images) and count($r->images)) {
            $images_url = $this->storeImage($r->images);
        }
        $imagesjson = json_encode($images_url);
        $data = [
            'message' => $r->message,
            'status' => 1,
            'images' => $imagesjson,
            'channel_id' => $channelID,
            'sender_id' => auth()->id()
        ];
        $message =Message::create($data);
        return new MessageResources($message);
    }
    private function storeImage($images)
    {
        $images_url = [];
        foreach ($images as $key =>$file_data) {
            $file_name = 'messages/image/image_'.time().'-'.$key.'.png';
            @list($type, $file_data) = explode(';', $file_data);
            @list(, $file_data) = explode(',', $file_data);
            if($file_data!=""){
                $path = Storage::put($file_name,base64_decode($file_data));
            }else {
                $path = null;
            }
            array_push($images_url, $file_name);
        }
        return $images_url;
    }
}
