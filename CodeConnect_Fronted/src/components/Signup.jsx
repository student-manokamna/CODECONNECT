import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import BASE_URL from '../utils/constant'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Signup = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [passWord, setPassWord] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [error, SetError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      const result = await axios.post(BASE_URL + "/signup", {
        firstName, lastName, emailId, passWord, age, gender
      }, {
        withCredentials: true
      })
      // dispatch(addUser(result.data)) 
      // User requested explicit login flow after signup
      return navigate("/login")
    }
    catch (err) {
      SetError(err.response?.data || "Something went wrong")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="Max"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                placeholder="Robinson"
                required
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                placeholder="Male/Female/Other"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handleSignup}>Sign Up</Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline text-primary">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup