import React, { useEffect, useState } from 'react'
import BASE_URL from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeResults, setSwipeResults] = useState([]);

  const getFeed = async () => {
    if (feed) return
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      })
      dispatch(addFeed(res.data))
    }
    catch (err) {
      console.log(err);
      if (err.response?.status === 400) {
        window.location.href = "/login"; // Or use next/router if using Next.js
      }
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  const handleSwipe = async (direction, user) => {
    const result = {
      user: user,
      direction: direction,
      action: direction === 'right' ? 'Interested' : 'Ignored'
    };

    const status = direction === 'right' ? 'interested' : 'ignore';

    // optimistically update UI
    setSwipeResults(prev => [...prev, result]);
    setCurrentIndex(i => i + 1);

    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${user._id}`,
        {},
        { withCredentials: true }
      );
      // console.log('Server response:', res.data);
    } catch (err) {
      console.error('Request failed:', err.response?.data || err.message);
    }
  };

  if (!feed || !Array.isArray(feed)) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (currentIndex >= feed.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="flex flex-col items-center justify-center w-full max-w-md text-center space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="p-4 bg-muted rounded-full">
            <span className="text-4xl">🎉</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">You've reached the end!</h2>
            <p className="text-muted-foreground mt-2">
              There are no more profiles to show right now. Check back later for new developers.
            </p>
          </div>

          <Card className="w-full border-dashed">
            <div className="p-6">
              <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wider">Session Summary</h3>
              <ScrollArea className="h-48 rounded-md border bg-muted/20 p-4">
                {swipeResults.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">No actions taken.</p>
                ) : (
                  <div className="space-y-3">
                    {swipeResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 bg-background rounded border shadow-sm">
                        <span className="font-medium">{result.user.firstName}</span>
                        <div className={`flex items-center gap-2 px-2 py-0.5 rounded-full text-xs font-medium ${result.direction === 'right'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                          {result.direction === 'right' ? 'Interested' : 'Passed'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const currentUser = feed[currentIndex];
  // const nextUser = feed[currentIndex + 1];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full h-full max-h-[800px]">
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex space-x-1">
            {feed.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${index < currentIndex
                  ? 'bg-muted'
                  : index === currentIndex
                    ? 'bg-primary'
                    : 'bg-muted/30'
                  }`}
              ></div>
            ))}
          </div>
          <span className="ml-3 text-sm text-muted-foreground font-medium">
            {currentIndex + 1} / {feed.length}
          </span>
        </div>

        <div className="relative w-full max-w-md flex justify-center items-center h-[500px]">
          {/* Stack of cards - render multiple cards for smooth transition */}
          {feed.slice(currentIndex, currentIndex + 3).map((user, index) => {
            const isCurrentCard = index === 0;
            const zIndex = 10 - index;
            const scale = 1 - (index * 0.05);
            const opacity = isCurrentCard ? 1 : 0.5; // Faded background cards
            const translateY = index * 10; // More visible stack

            return (
              <div
                key={`${user._id}-${currentIndex + index}`}
                className="absolute top-0 w-full px-4 md:px-0"
                style={{
                  zIndex: zIndex,
                  transform: `scale(${scale}) translateY(${translateY}px)`,
                  opacity: opacity,
                  pointerEvents: isCurrentCard ? 'auto' : 'none',
                  transition: 'transform 0.3s ease, opacity 0.3s ease'
                }}
              >
                <UserCard
                  user={user}
                  onSwipe={isCurrentCard ? handleSwipe : () => { }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Feed
