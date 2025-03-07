'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ContactInfo {
    email: string;
    phone: string;
}

interface PersonalInfo {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    nationality: string;
    contact_info: ContactInfo;
    profile_picture: string;
}

interface EnrollmentInfo {
    program: string;
    major: string;
    minor: string;
    current_year: number;
    status: string;
}

interface FinancialInfo {
    tuition_fee: number;
    outstanding_balance: number;
}

interface StudentData {
    student_id: string;
    personal_info: PersonalInfo;
    enrollment_info: EnrollmentInfo;
    financial_info: FinancialInfo;
}

// Mock function to simulate data fetching
const fetchStudentData = async (): Promise<StudentData> => {
    // In a real application, this would be an API call
    return {
        student_id: "S123456",
        personal_info: {
            first_name: "Arvind",
            last_name: "Sharma",
            date_of_birth: "2001-06-10",
            gender: "Male",
            nationality: "Indian",
            contact_info: {
                email: "guptaarvind2602@gmail.com",
                phone: "+919876543210",
            },
            profile_picture: "https://example.com/profile/Arvind.jpg"
        },
        enrollment_info: {
            program: "Bachelor of Technology",
            major: "Computer Science",
            minor: "Data Science",
            current_year: 4,
            status: "Active",
        },
        financial_info: {
            tuition_fee: 150000,
            outstanding_balance: 0,
        },
    }
}

export default function StudentDashboard() {
    const [studentData, setStudentData] = useState<StudentData | null>(null)
    const [editingSection, setEditingSection] = useState<string | null>(null)

    useEffect(() => {
        fetchStudentData().then(setStudentData)
    }, [])

    if (!studentData) {
        return <div className="flex items-center justify-center h-screen text-white">Loading...</div>
    }

    const handleEdit = (section: string) => {
        setEditingSection(section)
    }

    const handleSave = () => {
        // In a real application, this would send updated data to the server
        setEditingSection(null)
    }

    const handleInputChange = (section: keyof StudentData, field: string, value: string | number) => {
        setStudentData(prevData => {
            if (!prevData) return null
            return {
                ...prevData,
                [section]: {
                    ...(prevData[section] as object),
                    [field]: value
                }
            }
        })
    }

    return (
        <div className="min-h-screen pt-32 bg-black text-white p-4 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black">
            <div className="container mx-auto backdrop-blur-md bg-zinc-900/50 rounded-xl border border-zinc-800 p-6 shadow-lg">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">Student ERP</h1>
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={studentData.personal_info.profile_picture} alt={`${studentData.personal_info.first_name} ${studentData.personal_info.last_name}`} />
                            <AvatarFallback>{studentData.personal_info.first_name[0]}{studentData.personal_info.last_name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{studentData.personal_info.first_name} {studentData.personal_info.last_name}</p>
                            <p className="text-sm text-gray-400">{studentData.student_id}</p>
                        </div>
                    </div>
                </header>

                <Tabs defaultValue="personal" className="space-y-4">
                    <TabsList className="bg-zinc-800/50 backdrop-blur-sm">
                        <TabsTrigger value="personal" className="data-[state=active]:bg-zinc-700/50">Personal Info</TabsTrigger>
                        <TabsTrigger value="academic" className="data-[state=active]:bg-zinc-700/50">Academic Info</TabsTrigger>
                        <TabsTrigger value="financial" className="data-[state=active]:bg-zinc-700/50">Financial Info</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal">
                        <Card className="bg-zinc-900/50 backdrop-blur-md border-zinc-800">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle className="text-white">Personal Information</CardTitle>
                                    <CardDescription className="text-gray-400">Your personal details</CardDescription>
                                </div>
                                {editingSection === 'personal_info' ? (
                                    <Button onClick={handleSave} className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white">
                                        Save
                                    </Button>
                                ) : (
                                    <Button onClick={() => handleEdit('personal_info')} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                                        Edit
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                                            <Input
                                                id="firstName"
                                                value={studentData.personal_info.first_name}
                                                onChange={(e) => handleInputChange('personal_info', 'first_name', e.target.value)}
                                                disabled={editingSection !== 'personal_info'}
                                                className="bg-zinc-800/50 border-zinc-700 text-white"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                value={studentData.personal_info.last_name}
                                                onChange={(e) => handleInputChange('personal_info', 'last_name', e.target.value)}
                                                disabled={editingSection !== 'personal_info'}
                                                className="bg-zinc-800/50 border-zinc-700 text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                                        <Input
                                            id="email"
                                            value={studentData.personal_info.contact_info.email}
                                            onChange={(e) => handleInputChange('personal_info', 'contact_info', e.target.value)}
                                            disabled={editingSection !== 'personal_info'}
                                            className="bg-zinc-800/50 border-zinc-700 text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={studentData.personal_info.contact_info.phone}
                                            onChange={(e) => handleInputChange('personal_info', 'contact_info', e.target.value)}
                                            disabled={editingSection !== 'personal_info'}
                                            className="bg-zinc-800/50 border-zinc-700 text-white"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="academic">
                        <Card className="bg-zinc-900/50 backdrop-blur-md border-zinc-800">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle className="text-white">Academic Information</CardTitle>
                                    <CardDescription className="text-gray-400">Your academic records</CardDescription>
                                </div>
                                {editingSection === 'enrollment_info' ? (
                                    <Button onClick={handleSave} className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white">
                                        Save
                                    </Button>
                                ) : (
                                    <Button onClick={() => handleEdit('enrollment_info')} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                                        Edit
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-gray-300">Program</Label>
                                        <Input
                                            value={studentData.enrollment_info.program}
                                            onChange={(e) => handleInputChange('enrollment_info', 'program', e.target.value)}
                                            disabled={editingSection !== 'enrollment_info'}
                                            className="bg-zinc-800/50 border-zinc-700 text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-gray-300">Major</Label>
                                        <Input
                                            value={studentData.enrollment_info.major}
                                            onChange={(e) => handleInputChange('enrollment_info', 'major', e.target.value)}
                                            disabled={editingSection !== 'enrollment_info'}
                                            className="bg-zinc-800/50 border-zinc-700 text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-gray-300">Minor</Label>
                                        <Input
                                            value={studentData.enrollment_info.minor}
                                            onChange={(e) => handleInputChange('enrollment_info', 'minor', e.target.value)}
                                            disabled={editingSection !== 'enrollment_info'}
                                            className="bg-zinc-800/50 border-zinc-700 text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-gray-300">Current Year</Label>
                                        <Input
                                            value={studentData.enrollment_info.current_year.toString()}
                                            onChange={(e) => handleInputChange('enrollment_info', 'current_year', parseInt(e.target.value, 10))}
                                            disabled={editingSection !== 'enrollment_info'}
                                            className="bg-zinc-800/50 border-zinc-700 text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-gray-300">Status</Label>
                                        <Input
                                            value={studentData.enrollment_info.status}
                                            onChange={(e) => handleInputChange('enrollment_info', 'status', e.target.value)}
                                            disabled={editingSection !== 'enrollment_info'}
                                            className="bg-zinc-800/50 border-zinc-700 text-white"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="financial">
                        <Card className="bg-zinc-900/50 backdrop-blur-md border-zinc-800">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle className="text-white">Financial Information</CardTitle>
                                    <CardDescription className="text-gray-400">Your financial records</CardDescription>
                                </div>
                                {editingSection === 'financial_info' ? (
                                    <Button onClick={handleSave} className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white">
                                        Save
                                    </Button>
                                ) : (
                                    <Button onClick={() => handleEdit('financial_info')} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                                        Edit
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-gray-300">Tuition Fee</Label>
                                        <Input
                                            value={studentData.financial_info.tuition_fee.toString()}
                                            onChange={(e) => handleInputChange('financial_info', 'tuition_fee', parseFloat(e.target.value))}
                                            disabled={editingSection !== 'financial_info'}
                                            className="bg-zinc-800/50 border-zinc-700 text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-gray-300">Outstanding Balance</Label>
                                        <Input
                                            value={studentData.financial_info.outstanding_balance.toString()}
                                            onChange={(e) => handleInputChange('financial_info', 'outstanding_balance', parseFloat(e.target.value))}
                                            disabled={editingSection !== 'financial_info'}
                                            className="bg-zinc-800/50 border-zinc-700 text-white"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}