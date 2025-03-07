'use client'

import React, { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        // Retrieve user data from local storage
        const existingUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')!) : []

        // Check if a user with the provided email and password exists
        const user = existingUsers.find((user: any) => user.email === email && user.password === password)

        if (user) {
            console.log('Login successful for:', { email })
            toast.success('Login successful!')
            window.location.href = '/dashboard'  // Redirect to the dashboard
        } else {
            console.error('Login failed: Invalid credentials')
            toast.error('Login failed: Invalid email or password')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black p-4">
            <Card className="w-full max-w-md backdrop-blur-md bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">Login to Your Account</CardTitle>
                    <CardDescription className="text-center text-gray-400">Enter your credentials to access the dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder-gray-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-300">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder-gray-500"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                            Login
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-blue-400 hover:underline">
                            Register here
                        </Link>
                    </p>
                </CardFooter>
            </Card>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
    )
}
