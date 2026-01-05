import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constant";
import UserCard2 from "./UserCard2"; // Assuming UserCard2 is now the Shadcn preview
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState(user.firstName || "");
  const [lastName, setlastName] = useState(user.lastName || "");
  const [age, setage] = useState(user.age || "");
  const [gender, setgender] = useState(user.gender || "");
  const [about, setabout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showtoast, setshowtoast] = useState(false);

  useEffect(() => {
    // In many cases user prop is enough, but fetching fresh data is fine
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        // You might want to update state here if you fetch fresh data, 
        // but typically the parent passes the user prop, or you update Redux.
        // For now, relying on passed user prop mostly.
      } catch (err) {
        console.error("Error fetching profile:", err.message);
        setError("Failed to load profile data.");
      }
    };

    fetchProfile();
  }, []);

  const handlesave = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setshowtoast(true);
      setTimeout(() => {
        setshowtoast(false);
      }, 3000);
    } catch (err) {
      console.error("Error Message:", err.message);
      setError("Failed to save profile data.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Edit Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <div className="text-destructive text-sm text-center">{error}</div>}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  placeholder="First Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setage(e.target.value)}
                placeholder="Age"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                value={gender}
                onChange={(e) => setgender(e.target.value)}
                placeholder="Gender"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Input
                id="about"
                value={about}
                onChange={(e) => setabout(e.target.value)}
                placeholder="Tell us about yourself..."
              />
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={handlesave} className="w-full md:w-auto min-w-[120px]">
              Save Changes
            </Button>
          </CardFooter>
        </Card>

        {/* Preview Card */}
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold text-muted-foreground">Preview</h3>
          <UserCard2 user={{ firstName, lastName, about, age, gender, photoUrl: user.photoUrl }} />
        </div>
      </div>

      {showtoast && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg animate-in fade-in slide-in-from-bottom border-b-4 border-green-700">
          Profile updated successfully!
        </div>
      )}
    </div>
  );
};

export default EditProfile;
