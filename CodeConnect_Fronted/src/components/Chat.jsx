import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import BASE_URL from "../utils/constant";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Trash2, Video, History } from "lucide-react"

const Chat = () => {
    const { targetUserId } = useParams();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [targetUser, setTargetUser] = useState(null);
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        const fetchTargetUser = async () => {
            try {
                const res = await axios.get(BASE_URL + "/user/" + targetUserId, {
                    withCredentials: true,
                });
                setTargetUser(res.data);
            } catch (err) {
                console.error("Error fetching target user:", err);
            }
        };
        fetchTargetUser();
    }, [targetUserId]);

    useEffect(() => {
        if (!user?._id) return;

        // Fetch message history
        const fetchMessages = async () => {
            try {
                const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
                    withCredentials: true,
                });
                setMessages(res.data);
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };
        fetchMessages();

        // Initialize socket
        socketRef.current = io(BASE_URL.replace("/api", ""), { // Dynamic socket URL based on base
            withCredentials: true,
        });

        socketRef.current.on("connect", () => {
            // console.log("Connected to socket");
            socketRef.current.emit("joinChat", {
                userId: user._id,
                targetUserId,
            });
        });

        socketRef.current.on("messageReceived", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [targetUserId, user?._id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const optimisticMsg = {
            senderId: user._id,
            receiverId: targetUserId,
            message: newMessage,
            createdAt: new Date().toISOString()
        };

        // Optimistically update UI
        setMessages((prev) => [...prev, optimisticMsg]);

        socketRef.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: targetUserId,
            message: newMessage,
        });
        setNewMessage("");
    };

    const handleClearChat = async () => {
        if (!confirm("Are you sure you want to delete all messages? This cannot be undone.")) return;

        try {
            await axios.delete(BASE_URL + "/chat/clear/" + targetUserId, {
                withCredentials: true,
            });
            setMessages([]);
        } catch (err) {
            console.error("Error clearing chat:", err);
        }
    };

    const handleVideoCall = () => {
        if (!user || !targetUserId) return;
        const roomId = [user._id, targetUserId].sort().join("_");
        navigate("/call/" + roomId);
    };

    const handleHistory = () => {
        navigate("/history");
    };

    return (
        <div className="container mx-auto px-4 mt-4 py-8 max-w-4xl h-[calc(100vh-6rem)] flex flex-col">
            <div className="flex-1 border bg-card text-card-foreground shadow-sm rounded-lg flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b bg-muted/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {targetUser && (
                            <Avatar className="h-10 w-10 border border-border">
                                <AvatarImage src={targetUser.photoUrl} alt={targetUser.firstName} />
                                <AvatarFallback>{targetUser.firstName?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div>
                            <h2 className="font-semibold text-lg flex items-center gap-2">
                                {targetUser ? `${targetUser.firstName} ${targetUser.lastName}` : "Chat"}
                            </h2>
                            {targetUser && <p className="text-xs text-muted-foreground">Online</p>}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handleVideoCall} className="text-muted-foreground hover:text-primary" title="Video Call">
                            <Video className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleHistory} className="text-muted-foreground hover:text-accent-foreground" title="View Recordings">
                            <History className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleClearChat}
                            className="flex items-center gap-2 px-3"
                            title="Delete Chat History"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Clear Chat</span>
                        </Button>
                    </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4 bg-slate-50 dark:bg-zinc-950/50">
                    <div className="space-y-6">
                        {messages.map((msg, index) => {
                            const isMe = msg.senderId === user._id;
                            return (
                                <div key={index} className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                                    {!isMe && (
                                        <Avatar className="h-8 w-8 border border-border mb-1 shadow-sm">
                                            <AvatarImage src={targetUser?.photoUrl} alt="Friend" />
                                            <AvatarFallback>{targetUser?.firstName?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    )}

                                    <div
                                        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-sm transition-all ${isMe
                                            ? "bg-green-600 text-white rounded-tr-none shadow-green-900/10"
                                            : "bg-white border border-slate-200 text-slate-800 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 rounded-tl-none"
                                            }`}
                                    >
                                        <p className="leading-relaxed tracking-wide">{msg.message}</p>
                                        <p className={`text-[10px] mt-1.5 flex justify-end font-medium ${isMe ? "text-green-100/80" : "text-slate-400 dark:text-zinc-400"}`}>
                                            {new Date(msg.createdAt).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>

                                    {isMe && (
                                        <Avatar className="h-8 w-8 border border-border mb-1 shadow-sm">
                                            <AvatarImage src={user?.photoUrl} alt="Me" />
                                            <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t bg-background flex gap-3">
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon" className="bg-green-600 hover:bg-green-700 text-white">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
