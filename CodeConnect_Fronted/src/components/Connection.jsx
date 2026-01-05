import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../utils/constant";
import { addConnections } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle } from "lucide-react"

const Connection = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getConnection();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">No Connections Yet</h2>
        <p className="text-muted-foreground">Start connecting with developers!</p>
        <Button asChild>
          <Link to="/feed">Browse Feed</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Connections</h1>
        <p className="text-muted-foreground">{connections.length} connections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {connections.map((connection) => {
          const { firstName, lastName, age, photoUrl, about, gender, _id } = connection;

          return (
            <Card key={_id} className="overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14 border border-border">
                    <AvatarImage src={photoUrl} alt={firstName} />
                    <AvatarFallback>{firstName?.charAt(0)}{lastName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-lg truncate">
                      {firstName} {lastName}
                    </h2>
                    {(age || gender) && (
                      <p className="text-sm text-muted-foreground">
                        {age && <span>{age} years old</span>}
                        {age && gender && <span> • </span>}
                        {gender && <span>{gender}</span>}
                      </p>
                    )}
                  </div>
                </div>
                {/* Dynamic About Text */}
                <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                  {(about && about !== "this is default about the user")
                    ? about
                    : "Passionate developer looking to connect and collaborate."}
                </p>
              </CardContent>
              <CardFooter className="bg-muted/50 p-4">
                <Button asChild className="w-full flex items-center gap-2">
                  <Link to={`/chat/${_id}`}>
                    <MessageCircle size={16} />
                    Message
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Connection;
