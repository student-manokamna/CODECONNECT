import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, FileText, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const CallHistory = () => {
    // Dummy Data for Interview Showcase
    const calls = [
        {
            id: 1,
            caller: "Akash Gupta",
            date: "Yesterday, 8:30 PM",
            duration: "45 mins",
            summary: "Discussed the project timeline for the new React Native app. Akash mentioned he will share the Figma designs by Monday. We agreed to start the backend setup using Node.js and MongoDB. Action items: Create GitHub repo, setup database schema.",
            videoUrl: "https://v.ftcdn.net/01/99/33/21/700_F_199332168_dAgA4gJvF6J2aF7CeaLdxT7C7D0E5WJ3_ST.mp4"
        },
        {
            id: 2,
            caller: "Sarah Chen",
            date: "Jan 1, 10:00 AM",
            duration: "1 hour 20 mins",
            summary: "Deep dive into the authentication flow. Debated between using JWT vs Session cookies. Decided on JWT for scalability. Sarah approved the 'Coffee' theme implementation. She asked for a live demo next week.",
            videoUrl: "https://v.ftcdn.net/02/13/66/83/700_F_213668359_R4zF2k7tJ4yX5g5e5y5fX5z5k5n5o5p.mp4"
        },
        {
            id: 3,
            caller: "David Ross",
            date: "Dec 28, 6:15 PM",
            duration: "15 mins",
            summary: "Quick sync up on the API latency issues. Resolved the connection request bug where users couldn't accept requests. David verified the fix. Planned the next sprint goals: Video Call Integration and AI Chat Summary.",
            videoUrl: "https://v.ftcdn.net/01/99/33/21/700_F_199332168_dAgA4gJvF6J2aF7CeaLdxT7C7D0E5WJ3_ST.mp4"
        }
    ];

    const [selectedCall, setSelectedCall] = useState(null);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl h-screen flex flex-col">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Call Recordings & Summaries
                <span className="text-xs font-normal text-muted-foreground ml-2">(AI Powered)</span>
            </h1>

            <ScrollArea className="flex-1">
                <div className="space-y-4">
                    {calls.map((call) => (
                        <Card key={call.id} className="bg-card hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setSelectedCall(call)}>
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-lg">{call.caller}</h3>
                                    <p className="text-sm text-muted-foreground">{call.date} • {call.duration}</p>
                                    <p className="text-sm mt-2 line-clamp-1 text-zinc-500 dark:text-zinc-400">
                                        Summary: {call.summary}
                                    </p>
                                </div>
                                <Button variant="outline" size="icon" className="shrink-0 ml-4">
                                    <Play className="h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>

            {/* Detail Modal */}
            <Dialog open={!!selectedCall} onOpenChange={(open) => !open && setSelectedCall(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            Recording: {selectedCall?.caller}
                            <span className="text-sm font-normal text-muted-foreground">({selectedCall?.date})</span>
                        </DialogTitle>
                    </DialogHeader>

                    {selectedCall && (
                        <div className="space-y-6">
                            {/* Dummy Video Player */}
                            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative group">
                                <video src={selectedCall.videoUrl} controls className="w-full h-full object-cover" />
                            </div>

                            {/* Summary Section */}
                            <div className="bg-muted/30 p-4 rounded-lg border border-border">
                                <h4 className="font-semibold mb-2 flex items-center gap-2 text-primary">
                                    <FileText className="h-4 w-4" /> AI Generated Summary
                                </h4>
                                <p className="text-sm leading-relaxed text-foreground/90">
                                    {selectedCall.summary}
                                </p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CallHistory;
