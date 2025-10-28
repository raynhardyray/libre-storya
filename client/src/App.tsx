import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3000");

    return () => {
      socket.disconnect();
    }

  }, []);

  const [nicknameDialog, setNicknameDialog] = useState(true);
  const [nickname, setNickname] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{nickname: string, message: string}>>([]);
  const [userMessage, setUserMessage] = useState("");

  const handleNicknameSubmit = () => {
    setNicknameDialog(false);
  };

  const handleChatSubmit = () => {
    setChatMessages((prev) => [...prev, {
      nickname: nickname,
      message: userMessage
    }]);
    setUserMessage("");
  };

  return (
    <>
      <Dialog open={nicknameDialog} onOpenChange={setNicknameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your username</DialogTitle>
            <DialogDescription>
              Please enter your username to join the chat.
            </DialogDescription>
          </DialogHeader>
            <Input
              placeholder="Juan dela Cruz"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          <DialogFooter className="">
            <DialogClose asChild>
              <Button 
                type="submit"
                onClick={handleNicknameSubmit}
              >Submit</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col mx-50 mt-10 gap-3">
        <h1>Your Name: {nickname}</h1>

        <div className="border border-black rounded-lg p-5">
          {chatMessages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.nickname}:</strong> {msg.message}
            </div>
          ))}
        </div>
        
        <div className="flex gap-x-2">
          <Input placeholder="Type your message here" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
          <Button type="submit" onClick={handleChatSubmit}>Send</Button>
        </div>
      </div>
    </>
  );
}

export default App
