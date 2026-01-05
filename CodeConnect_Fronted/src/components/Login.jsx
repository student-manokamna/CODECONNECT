import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../utils/constant';
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

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [emailId, setEmailId] = useState("");
  const [passWord, setPassWord] = useState("");
  const [error, SetError] = useState("");

  const handlelogin = async () => {
    try {
      const result = await axios.post(BASE_URL + "/login", {
        emailId: emailId,
        passWord: passWord
      }, {
        withCredentials: true
      })
      dispatch(addUser(result.data))
      return navigate("/feed")
    }
    catch (err) {
      SetError(err?.response?.data || "something went wrong")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handlelogin}>Sign in</Button>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline text-primary">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login