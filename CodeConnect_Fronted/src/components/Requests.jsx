import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../utils/constant";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X } from "lucide-react"

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [toast, setToast] = useState({ show: false, message: "" });

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/recieved`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleRequest = async (status, fromId, name) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${fromId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequests(fromId));

      if (status === "accepted") {
        dispatch(addConnections(res.data.data));
        showToast(`✅ Connected with ${name}!`);
      } else {
        showToast(`Request from ${name} rejected`);
      }
    } catch (error) {
      console.error("Error:", error.message);
      showToast("Something went wrong");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">No Pending Requests</h2>
        <p className="text-muted-foreground">You're all caught up!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Toast */}
      {toast.show && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg animate-in slide-in-from-right fade-in duration-300">
          {toast.message}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Connection Requests</h1>
        <p className="text-muted-foreground">{requests.length} pending requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {requests.map((request) => {
          const { firstName, lastName, age, photoUrl, about, gender } = request.fromUserId;

          return (
            <Card key={request._id} className="overflow-hidden">
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
                {about && (
                  <p className="mt-4 text-sm text-muted-foreground line-clamp-2">{about}</p>
                )}
              </CardContent>
              <CardFooter className="bg-muted/50 p-4 gap-3">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleRequest("accepted", request.fromUserId._id, firstName)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Accept
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleRequest("rejected", request.fromUserId._id, firstName)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
