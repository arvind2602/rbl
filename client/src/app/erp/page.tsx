'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import cookies from 'js-cookie'
import { CalendarDays, GraduationCap, CreditCard, User, Mail, Phone, Pencil, Save, Globe } from 'lucide-react'

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
    user_uuid: string;
    personal_info: PersonalInfo;
    enrollment_info: EnrollmentInfo;
    financial_info: FinancialInfo;
}

const defaultStudentData: StudentData = {
    user_uuid: cookies.get('user_uuid') || "",
    personal_info: {
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        nationality: "",
        contact_info: {
            email: "",
            phone: ""
        },
        profile_picture: ""
    },
    enrollment_info: {
        program: "",
        major: "",
        minor: "",
        current_year: 0,
        status: ""
    },
    financial_info: {
        tuition_fee: 0,
        outstanding_balance: 0
    }
};

export default function StudentDashboard() {
    const [studentData, setStudentData] = useState<StudentData>(defaultStudentData);
    const [editingSection, setEditingSection] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const userUuid = cookies.get('user_uuid');
                if (!userUuid) {
                    console.error('No user_uuid found in cookies');
                    setStudentData(defaultStudentData);
                    return;
                }

                const response = await fetch(`http://localhost:5000/api/erp/read/${userUuid}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.status === 404) {
                    setStudentData(defaultStudentData);
                } else if (response.ok) {
                    const data = await response.json();
                    // Ensure the data matches our expected structure
                    setStudentData({
                        ...defaultStudentData,
                        ...data,
                        personal_info: {
                            ...defaultStudentData.personal_info,
                            ...(data.personal_info || {})
                        },
                        enrollment_info: {
                            ...defaultStudentData.enrollment_info,
                            ...(data.enrollment_info || {})
                        },
                        financial_info: {
                            ...defaultStudentData.financial_info,
                            ...(data.financial_info || {})
                        }
                    });
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setStudentData(defaultStudentData);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSave = async (section: string) => {
        const user_uuid = cookies.get('user_uuid');
        if (!user_uuid) return;

        try {
            const response = await fetch(`http://localhost:5000/api/erp/update/${user_uuid}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
            if (response.ok) {
                const updatedData = await response.json();
                setStudentData(updatedData);
                setEditingSection(null);
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleInputChange = (section: keyof StudentData, field: string, value: any, nestedField?: string) => {
        setStudentData(prevData => {
            if (!prevData) return defaultStudentData;
            if (nestedField) {
                return {
                    ...prevData,
                    [section]: {
                        ...(prevData[section] as object),
                        [field]: {
                            ...(prevData[section] as any)[field] || {},
                            [nestedField]: value
                        }
                    }
                };
            }
            return {
                ...prevData,
                [section]: {
                    ...(prevData[section] as object),
                    [field]: value
                }
            };
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-indigo-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-white text-lg">Loading your student profile...</p>
                </div>
            </div>
        );
    }

    // Add null check for personal_info
    const personalInfo = studentData.personal_info || defaultStudentData.personal_info;
    const enrollmentInfo = studentData.enrollment_info || defaultStudentData.enrollment_info;
    const financialInfo = studentData.financial_info || defaultStudentData.financial_info;

    const fullName = `${personalInfo.first_name} ${personalInfo.last_name}`.trim();
    const initials = `${personalInfo.first_name?.[0] || ""}${personalInfo.last_name?.[0] || ""}`.toUpperCase() || "SD";

    return (
        <div className="min-h-screen bg-black text-white bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black pt-12 pb-12">
            {/* Decorative Elements */}
            <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-violet-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Profile Header Card */}
                <Card className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 mb-8 overflow-hidden">
                    <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
                    <CardContent className="pt-0">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-12 mb-4">
                            <Avatar className="w-24 h-24 border-4 border-zinc-900 shadow-lg">
                                <AvatarImage src={personalInfo.profile_picture} />
                                <AvatarFallback className="text-2xl bg-gradient-to-br from-indigo-500 to-purple-600">{initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl font-bold">{fullName || "Student Name"}</h1>
                                <p className="text-zinc-400 flex items-center justify-center md:justify-start mt-1">
                                    <GraduationCap className="w-4 h-4 mr-1" />
                                    {enrollmentInfo.program || "Program"} • Year {enrollmentInfo.current_year || "0"}
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-2">
                                <Badge variant="outline" className="bg-indigo-950/40 text-indigo-300 border-indigo-800/50 px-3 py-1">
                                    ID: {studentData.user_uuid.substring(0, 8)}
                                </Badge>
                                <Badge variant="outline" className={`px-3 py-1 ${enrollmentInfo.status === "Active"
                                        ? "bg-green-950/40 text-green-300 border-green-800/50"
                                        : "bg-orange-950/40 text-orange-300 border-orange-800/50"
                                    }`}>
                                    {enrollmentInfo.status || "Status"}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 hover:border-zinc-700/50 transition-all">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center">
                                <User className="w-5 h-5 mr-2 opacity-80" />
                                Personal Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Nationality</span>
                                    <span className="flex items-center font-medium">
                                        <Globe className="w-4 h-4 mr-1 text-blue-400" />
                                        {personalInfo.nationality || "Not Specified"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Gender</span>
                                    <span className="font-medium">{personalInfo.gender || "Not Specified"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Date of Birth</span>
                                    <span className="flex items-center font-medium">
                                        <CalendarDays className="w-4 h-4 mr-1 text-purple-400" />
                                        {personalInfo.date_of_birth || "Not Specified"}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 hover:border-zinc-700/50 transition-all">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center">
                                <GraduationCap className="w-5 h-5 mr-2 opacity-80" />
                                Academic Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Major</span>
                                    <span className="font-medium">{enrollmentInfo.major || "Not Specified"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Minor</span>
                                    <span className="font-medium">{enrollmentInfo.minor || "Not Specified"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Year</span>
                                    <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                                        Year {enrollmentInfo.current_year || "0"}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 hover:border-zinc-700/50 transition-all">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center">
                                <CreditCard className="w-5 h-5 mr-2 opacity-80" />
                                Financial Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Tuition Fee</span>
                                    <span className="font-medium">${financialInfo.tuition_fee.toLocaleString() || "0"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Outstanding</span>
                                    <span className={`font-medium ${financialInfo.outstanding_balance > 0 ? 'text-red-400' : 'text-green-400'}`}>
                                        ${financialInfo.outstanding_balance.toLocaleString() || "0"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Payment Status</span>
                                    <Badge className={`${financialInfo.outstanding_balance > 0
                                            ? 'bg-red-900/50 text-red-200 hover:bg-red-900/70'
                                            : 'bg-green-900/50 text-green-200 hover:bg-green-900/70'
                                        }`}>
                                        {financialInfo.outstanding_balance > 0 ? "Pending" : "Paid"}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Card */}
                <Card className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 hover:border-zinc-700/50 transition-all mb-8">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Contact Information</CardTitle>
                            {editingSection === 'contact_info' ? (
                                <Button onClick={() => handleSave('personal_info')} size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                                    <Save className="w-4 h-4 mr-1" /> Save
                                </Button>
                            ) : (
                                <Button onClick={() => setEditingSection('contact_info')} size="sm" variant="outline" className="border-zinc-700 hover:bg-zinc-800/50">
                                    <Pencil className="w-4 h-4 mr-1" /> Edit
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 bg-zinc-800/30 p-3 rounded-lg">
                                <div className="bg-indigo-900/50 p-2 rounded-full">
                                    <Mail className="w-5 h-5 text-indigo-300" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-zinc-400">Email Address</p>
                                    {editingSection === 'contact_info' ? (
                                        <Input
                                            value={personalInfo.contact_info.email}
                                            onChange={(e) => handleInputChange('personal_info', 'contact_info', e.target.value, 'email')}
                                            className="bg-zinc-800/50 border-zinc-700 text-white mt-1"
                                        />
                                    ) : (
                                        <p className="font-medium">{personalInfo.contact_info.email || "Not Specified"}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-zinc-800/30 p-3 rounded-lg">
                                <div className="bg-purple-900/50 p-2 rounded-full">
                                    <Phone className="w-5 h-5 text-purple-300" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-zinc-400">Phone Number</p>
                                    {editingSection === 'contact_info' ? (
                                        <Input
                                            value={personalInfo.contact_info.phone}
                                            onChange={(e) => handleInputChange('personal_info', 'contact_info', e.target.value, 'phone')}
                                            className="bg-zinc-800/50 border-zinc-700 text-white mt-1"
                                        />
                                    ) : (
                                        <p className="font-medium">{personalInfo.contact_info.phone || "Not Specified"}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Tabs */}
                <Tabs defaultValue="personal" className="space-y-4">
                    <TabsList className="bg-zinc-800/50 border border-zinc-700/30 p-1 backdrop-blur-sm">
                        <TabsTrigger value="personal" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500/90 data-[state=active]:to-violet-500/90 data-[state=active]:text-white">
                            Personal Details
                        </TabsTrigger>
                        <TabsTrigger value="academic" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500/90 data-[state=active]:to-violet-500/90 data-[state=active]:text-white">
                            Academic Records
                        </TabsTrigger>
                        <TabsTrigger value="financial" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500/90 data-[state=active]:to-violet-500/90 data-[state=active]:text-white">
                            Financial Records
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal">
                        <Card className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"></div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                                        Personal Information
                                    </CardTitle>
                                    <CardDescription className="text-zinc-400">
                                        Update your personal details and preferences
                                    </CardDescription>
                                </div>
                                {editingSection === 'personal_info' ? (
                                    <Button onClick={() => handleSave('personal_info')} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                                        <Save className="w-4 h-4 mr-2" /> Save Changes
                                    </Button>
                                ) : (
                                    <Button onClick={() => setEditingSection('personal_info')} className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white">
                                        <Pencil className="w-4 h-4 mr-2" /> Edit Details
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName" className="text-zinc-300">First Name</Label>
                                            <Input
                                                id="firstName"
                                                value={personalInfo.first_name}
                                                onChange={(e) => handleInputChange('personal_info', 'first_name', e.target.value)}
                                                disabled={editingSection !== 'personal_info'}
                                                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-indigo-500 focus:ring-indigo-500/30"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName" className="text-zinc-300">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                value={personalInfo.last_name}
                                                onChange={(e) => handleInputChange('personal_info', 'last_name', e.target.value)}
                                                disabled={editingSection !== 'personal_info'}
                                                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-indigo-500 focus:ring-indigo-500/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="dob" className="text-zinc-300">Date of Birth</Label>
                                            <div className="relative">
                                                <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
                                                <Input
                                                    id="dob"
                                                    type="date"
                                                    value={personalInfo.date_of_birth}
                                                    onChange={(e) => handleInputChange('personal_info', 'date_of_birth', e.target.value)}
                                                    disabled={editingSection !== 'personal_info'}
                                                    className="bg-zinc-800/50 border-zinc-700 text-white pl-10 focus:border-indigo-500 focus:ring-indigo-500/30"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="gender" className="text-zinc-300">Gender</Label>
                                            <Input
                                                id="gender"
                                                value={personalInfo.gender}
                                                onChange={(e) => handleInputChange('personal_info', 'gender', e.target.value)}
                                                disabled={editingSection !== 'personal_info'}
                                                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-indigo-500 focus:ring-indigo-500/30"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="nationality" className="text-zinc-300">Nationality</Label>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
                                                <Input
                                                    id="nationality"
                                                    value={personalInfo.nationality}
                                                    onChange={(e) => handleInputChange('personal_info', 'nationality', e.target.value)}
                                                    disabled={editingSection !== 'personal_info'}
                                                    className="bg-zinc-800/50 border-zinc-700 text-white pl-10 focus:border-indigo-500 focus:ring-indigo-500/30"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
                                                <Input
                                                    id="email"
                                                    value={personalInfo.contact_info.email}
                                                    onChange={(e) => handleInputChange('personal_info', 'contact_info', e.target.value, 'email')}
                                                    disabled={editingSection !== 'personal_info'}
                                                    className="bg-zinc-800/50 border-zinc-700 text-white pl-10 focus:border-indigo-500 focus:ring-indigo-500/30"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-zinc-300">Phone Number</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
                                                <Input
                                                    id="phone"
                                                    value={personalInfo.contact_info.phone}
                                                    onChange={(e) => handleInputChange('personal_info', 'contact_info', e.target.value, 'phone')}
                                                    disabled={editingSection !== 'personal_info'}
                                                    className="bg-zinc-800/50 border-zinc-700 text-white pl-10 focus:border-indigo-500 focus:ring-indigo-500/30"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-zinc-900/50 border-t border-zinc-800/50 flex justify-end p-4">
                                {editingSection === 'personal_info' && (
                                    <div className="flex gap-2">
                                        <Button variant="outline" onClick={() => setEditingSection(null)} className="border-zinc-700 hover:bg-zinc-800">
                                            Cancel
                                        </Button>
                                        <Button onClick={() => handleSave('personal_info')} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                                            <Save className="w-4 h-4 mr-1" /> Save
                                        </Button>
                                    </div>
                                )}
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="academic">
                        <Card className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500"></div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                        Academic Records
                                    </CardTitle>
                                    <CardDescription className="text-zinc-400">
                                        View and update your academic information
                                    </CardDescription>
                                </div>
                                {editingSection === 'enrollment_info' ? (
                                    <Button onClick={() => handleSave('enrollment_info')} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                                        <Save className="w-4 h-4 mr-2" /> Save Changes
                                    </Button>
                                ) : (
                                    <Button onClick={() => setEditingSection('enrollment_info')} className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                                        <Pencil className="w-4 h-4 mr-2" /> Edit Records
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="bg-zinc-800/30 p-5 rounded-lg border border-zinc-700/30">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-full bg-indigo-900/50">
                                                <GraduationCap className="w-5 h-5 text-indigo-300" />
                                            </div>
                                            <div><h3 className="text-lg font-medium">Program Details</h3>
                                                <p className="text-zinc-400 text-sm">Your current academic program and major</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-zinc-300">Program</Label>
                                                <Input
                                                    value={enrollmentInfo.program}
                                                    onChange={(e) => handleInputChange('enrollment_info', 'program', e.target.value)}
                                                    disabled={editingSection !== 'enrollment_info'}
                                                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-indigo-500 focus:ring-indigo-500/30"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-zinc-300">Major</Label>
                                                    <Input
                                                        value={enrollmentInfo.major}
                                                        onChange={(e) => handleInputChange('enrollment_info', 'major', e.target.value)}
                                                        disabled={editingSection !== 'enrollment_info'}
                                                        className="bg-zinc-800/50 border-zinc-700 text-white focus:border-indigo-500 focus:ring-indigo-500/30"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-zinc-300">Minor</Label>
                                                    <Input
                                                        value={enrollmentInfo.minor}
                                                        onChange={(e) => handleInputChange('enrollment_info', 'minor', e.target.value)}
                                                        disabled={editingSection !== 'enrollment_info'}
                                                        className="bg-zinc-800/50 border-zinc-700 text-white focus:border-indigo-500 focus:ring-indigo-500/30"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-zinc-800/30 p-5 rounded-lg border border-zinc-700/30">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500">Year</Badge>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-zinc-300">Current Academic Year</Label>
                                                <Input
                                                    type="number"
                                                    value={enrollmentInfo.current_year}
                                                    onChange={(e) => handleInputChange('enrollment_info', 'current_year', parseInt(e.target.value) || 0)}
                                                    disabled={editingSection !== 'enrollment_info'}
                                                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-indigo-500 focus:ring-indigo-500/30"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-zinc-800/30 p-5 rounded-lg border border-zinc-700/30">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Badge className="bg-gradient-to-r from-violet-500 to-purple-500">Status</Badge>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-zinc-300">Enrollment Status</Label>
                                                <Input
                                                    value={enrollmentInfo.status}
                                                    onChange={(e) => handleInputChange('enrollment_info', 'status', e.target.value)}
                                                    disabled={editingSection !== 'enrollment_info'}
                                                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-indigo-500 focus:ring-indigo-500/30"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-zinc-900/50 border-t border-zinc-800/50 flex justify-end p-4">
                                {editingSection === 'enrollment_info' && (
                                    <div className="flex gap-2">
                                        <Button variant="outline" onClick={() => setEditingSection(null)} className="border-zinc-700 hover:bg-zinc-800">
                                            Cancel
                                        </Button>
                                        <Button onClick={() => handleSave('enrollment_info')} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                                            <Save className="w-4 h-4 mr-1" /> Save
                                        </Button>
                                    </div>
                                )}
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="financial">
                        <Card className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500"></div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                                        Financial Records
                                    </CardTitle>
                                    <CardDescription className="text-zinc-400">
                                        Track your financial status and payments
                                    </CardDescription>
                                </div>
                                {editingSection === 'financial_info' ? (
                                    <Button onClick={() => handleSave('financial_info')} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                                        <Save className="w-4 h-4 mr-2" /> Save Changes
                                    </Button>
                                ) : (
                                    <Button onClick={() => setEditingSection('financial_info')} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                                        <Pencil className="w-4 h-4 mr-2" /> Edit Records
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="bg-zinc-800/30 border border-zinc-700/30">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg flex items-center">
                                                    <CreditCard className="w-5 h-5 mr-2 text-purple-400" />
                                                    Tuition Fee
                                                </CardTitle>
                                                <Badge variant="outline" className="bg-zinc-800/50 border-zinc-700">
                                                    Academic Year 2024-2025
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="text-4xl font-bold text-center py-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                    ${financialInfo.tuition_fee.toLocaleString()}
                                                </div>
                                                <div className="pt-2">
                                                    <Label className="text-zinc-300">Update Tuition Fee</Label>
                                                    <Input
                                                        type="number"
                                                        value={financialInfo.tuition_fee}
                                                        onChange={(e) => handleInputChange('financial_info', 'tuition_fee', parseFloat(e.target.value) || 0)}
                                                        disabled={editingSection !== 'financial_info'}
                                                        className="bg-zinc-800/50 border-zinc-700 text-white mt-1 focus:border-purple-500 focus:ring-purple-500/30"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-zinc-800/30 border border-zinc-700/30">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg flex items-center">
                                                    <CreditCard className="w-5 h-5 mr-2 text-pink-400" />
                                                    Outstanding Balance
                                                </CardTitle>
                                                <Badge variant={financialInfo.outstanding_balance > 0 ? "destructive" : "default"} className={
                                                    financialInfo.outstanding_balance > 0
                                                        ? "bg-red-900/50 text-red-200 border-red-800/50"
                                                        : "bg-green-900/50 text-green-200 border-green-800/50"
                                                }>
                                                    {financialInfo.outstanding_balance > 0 ? "Payment Required" : "Fully Paid"}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className={`text-4xl font-bold text-center py-4 ${financialInfo.outstanding_balance > 0
                                                        ? "text-red-400"
                                                        : "text-green-400"
                                                    }`}>
                                                    ${financialInfo.outstanding_balance.toLocaleString()}
                                                </div>
                                                <div className="pt-2">
                                                    <Label className="text-zinc-300">Update Outstanding Balance</Label>
                                                    <Input
                                                        type="number"
                                                        value={financialInfo.outstanding_balance}
                                                        onChange={(e) => handleInputChange('financial_info', 'outstanding_balance', parseFloat(e.target.value) || 0)}
                                                        disabled={editingSection !== 'financial_info'}
                                                        className="bg-zinc-800/50 border-zinc-700 text-white mt-1 focus:border-pink-500 focus:ring-pink-500/30"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="mt-6">
                                    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-zinc-700/30">
                                        <CardHeader>
                                            <CardTitle className="text-lg">Payment Summary</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center pb-2 border-b border-zinc-700/30">
                                                    <span className="text-zinc-400">Total Tuition Fee</span>
                                                    <span className="font-medium">${financialInfo.tuition_fee.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center pb-2 border-b border-zinc-700/30">
                                                    <span className="text-zinc-400">Amount Paid</span>
                                                    <span className="font-medium text-green-400">${(financialInfo.tuition_fee - financialInfo.outstanding_balance).toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center pb-2 border-b border-zinc-700/30">
                                                    <span className="text-zinc-400">Remaining Balance</span>
                                                    <span className={`font-medium ${financialInfo.outstanding_balance > 0 ? "text-red-400" : "text-green-400"}`}>
                                                        ${financialInfo.outstanding_balance.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center pt-2">
                                                    <span className="font-medium">Payment Status</span>
                                                    <Badge className={`${financialInfo.outstanding_balance > 0
                                                            ? "bg-red-900/50 text-red-200"
                                                            : "bg-green-900/50 text-green-200"
                                                        }`}>
                                                        {financialInfo.outstanding_balance > 0 ? "Pending" : "Completed"}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-center border-t border-zinc-800 p-4">
                                            <Button disabled={financialInfo.outstanding_balance <= 0} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-5">
                                                <CreditCard className="w-5 h-5 mr-2" /> Make Payment
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-zinc-900/50 border-t border-zinc-800/50 flex justify-end p-4">
                                {editingSection === 'financial_info' && (
                                    <div className="flex gap-2">
                                        <Button variant="outline" onClick={() => setEditingSection(null)} className="border-zinc-700 hover:bg-zinc-800">
                                            Cancel
                                        </Button>
                                        <Button onClick={() => handleSave('financial_info')} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                                            <Save className="w-4 h-4 mr-1" /> Save
                                        </Button>
                                    </div>
                                )}
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Footer */}
                <div className="mt-8 text-center text-zinc-500 text-sm">
                    <p>© 2025 Student ERP System. All rights reserved.</p>
                    <p className="mt-1">Powered by AI-Enhanced Educational Management</p>
                </div>
            </div>
        </div>
    );
}