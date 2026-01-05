import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserCard2 = ({ user }) => {
    const { firstName, lastName, age, gender, about, photoUrl } = user;

    return (
        <Card className="w-full max-w-md shadow-xl pt-8 pb-6 bg-card h-[480px] flex flex-col items-center">
            <CardContent className="flex flex-col items-center w-full">
                <Avatar className="w-32 h-32 border-4 border-muted shadow-md mb-6">
                    <AvatarImage
                        src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                        className="object-cover"
                        draggable={false}
                    />
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
        </Card>
    )
}

export default UserCard2