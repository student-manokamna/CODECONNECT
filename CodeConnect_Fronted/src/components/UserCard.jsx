import React, { useState, useRef } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Heart } from "lucide-react"

const UserCard = ({ user, onSwipe }) => {
    const { firstName, lastName, age, gender, about, photoUrl } = user;
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [cardTransform, setCardTransform] = useState('');
    const cardRef = useRef(null);

    // console.log(user)

    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
        e.preventDefault();
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        setCurrentX(diffX);

        const rotation = diffX * 0.1;
        const opacity = Math.max(0.3, 1 - Math.abs(diffX) / 300);

        setCardTransform(`translateX(${diffX}px) rotate(${rotation}deg)`);
        cardRef.current.style.opacity = opacity;
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const diffX = currentX - startX;
        setCurrentX(diffX);

        const rotation = diffX * 0.1;
        const opacity = Math.max(0.3, 1 - Math.abs(diffX) / 300);

        setCardTransform(`translateX(${diffX}px) rotate(${rotation}deg)`);
        cardRef.current.style.opacity = opacity;
    };

    const handleEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 100;

        if (Math.abs(currentX) > threshold) {
            const direction = currentX > 0 ? 'right' : 'left';
            const finalX = currentX > 0 ? 1000 : -1000;

            setCardTransform(`translateX(${finalX}px) rotate(${currentX > 0 ? 30 : -30}deg)`);
            cardRef.current.style.opacity = 0;
            cardRef.current.style.zIndex = 1; // Lower z-index when swiped

            setTimeout(() => {
                onSwipe(direction, user);
            }, 300);
        } else {
            // Snap back to center
            setCardTransform('');
            cardRef.current.style.opacity = 1;
        }

        setCurrentX(0);
    };

    const handleIgnore = (e) => {
        e.stopPropagation(); // Prevent drag interference
        setCardTransform('translateX(-1000px) rotate(-30deg)');
        cardRef.current.style.opacity = 0;
        cardRef.current.style.zIndex = 1; // Lower z-index when swiped
        setTimeout(() => {
            onSwipe('left', user);
        }, 300);
    };

    const handleInterested = (e) => {
        e.stopPropagation(); // Prevent drag interference
        setCardTransform('translateX(1000px) rotate(30deg)');
        cardRef.current.style.opacity = 0;
        cardRef.current.style.zIndex = 1; // Lower z-index when swiped
        setTimeout(() => {
            onSwipe('right', user);
        }, 300);
    };

    return (
        <div
            ref={cardRef}
            className="w-full max-w-md cursor-grab active:cursor-grabbing select-none relative"
            style={{
                transform: cardTransform,
                transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(.4,2,.3,1)',
                touchAction: 'none',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
        >
            <Card className="h-[480px] flex flex-col items-center justify-between shadow-xl pt-8 pb-6 bg-card">
                <CardContent className="flex flex-col items-center w-full">
                    <Avatar className="w-32 h-32 border-4 border-muted shadow-md mb-6">
                        <AvatarImage src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} className="object-cover" draggable={false} />
                        <AvatarFallback className="text-4xl">{firstName?.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <h2 className="text-2xl font-bold mb-1 text-center">{firstName} {lastName}</h2>
                    {(age || gender) && (
                        <p className="text-muted-foreground mb-4 text-center">
                            {age} {gender && `• ${gender}`}
                        </p>
                    )}
                    {about && <p className="text-center text-sm px-4 line-clamp-3 mb-2">{about}</p>}
                </CardContent>
                <CardFooter className="gap-6 w-full justify-center">
                    <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-2 border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive" onClick={handleIgnore}>
                        <X className="h-8 w-8" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500/10 hover:text-green-600 hover:border-green-600" onClick={handleInterested}>
                        <Heart className="h-8 w-8 fill-current" />
                    </Button>
                </CardFooter>
            </Card>

            {/* Swipe indicators */}
            {isDragging && (
                <>
                    <div
                        className="absolute top-10 right-10 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-bold text-2xl transform -rotate-12 border-4 border-destructive-foreground z-50 pointer-events-none"
                        style={{ opacity: currentX < -50 ? Math.min(1, Math.abs(currentX) / 150) : 0 }}
                    >
                        NOPE
                    </div>
                    <div
                        className="absolute top-10 left-10 bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-2xl transform rotate-12 border-4 border-white z-50 pointer-events-none"
                        style={{ opacity: currentX > 50 ? Math.min(1, currentX / 150) : 0 }}
                    >
                        LIKE
                    </div>
                </>
            )}
        </div>
    )
}

export default UserCard
