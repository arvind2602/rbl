'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()

        // Simple validation
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!')
            return
        }

        // Simulate saving data to local storage
        const existingUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')!) : []
        existingUsers.push({ firstName, lastName, email, password, timestamp: new Date() })

        // Save updated users array back to local storage
        localStorage.setItem('users', JSON.stringify(existingUsers))

        console.log('Registration attempted with:', { firstName, lastName, email, password })
        toast.success('Registration successful!')
        window.location.href = '/login'  // Redirect to login page
    }

    return (
        <div className="min-h-screen pt-32 flex items-center justify-center bg-black bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black p-4">
            <Card className="w-full max-w-md backdrop-blur-md bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">Create an Account</CardTitle>
                    <CardDescription className="text-center text-gray-400">Enter your details to register</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                                <Input
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder-gray-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                                <Input
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder-gray-500"
                                />
                            </div>
                        </div>
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
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder-gray-500"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                            Register
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-400 hover:underline">
                            Login here
                        </Link>
                    </p>
                </CardFooter>
            </Card>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
    )
}
