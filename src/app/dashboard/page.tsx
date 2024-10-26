"use client";
import React from 'react';
import {
    BookOpen,
    User,
    Calendar,
    Award,
    Briefcase,
    Activity,
    Mail,
    Phone,
    MapPin,
    Globe,
    GraduationCap
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
    const studentData = {
        student_id: "S123456",
        personal_info: {
            first_name: "Arvind",
            last_name: "Sharma",
            email: "guptaarvind2602@gmail.com",
            phone: "+919876543210",
            address: {
                city: "Delhi",
                state: "Delhi"
            }
        },
        enrollment_info: {
            program: "Bachelor of Technology",
            major: "Computer Science",
            minor: "Data Science",
            current_year: 4,
            status: "Active"
        },
        academic_records: [
            {
                semester: "1st Semester",
                courses: [
                    {
                        course_code: "CS101",
                        course_name: "Programming Fundamentals",
                        grade: "A",
                        attendance_percentage: 95
                    },
                    {
                        course_code: "MATH101",
                        course_name: "Calculus",
                        grade: "B+",
                        attendance_percentage: 90
                    }
                ]
            }
        ],
        skills: [
            "Programming in Python",
            "Web Development",
            "Machine Learning",
            "Team Leadership",
            "Data Analysis"
        ]
    };

    return (
        <div className="min-h-screen mt-32 bg-black text-white p-8">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 mb-4 border border-zinc-800 rounded-full bg-zinc-900/50 backdrop-blur-md">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-zinc-300">Student Dashboard</span>
                </div>

                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                    Welcome, {studentData.personal_info.first_name}!
                </h1>
            </motion.div>
            {/* An edit button which will redirect to edit profile page */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-8"
            >
                <a href='/erp'>
                    <button className="px-4 py-2 bg-blue-400 text-black rounded-md">
                        Edit Profile
                    </button>
                </a>


            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Personal Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card className="bg-zinc-900/50 border border-zinc-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-400" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 text-zinc-300">
                                <Mail className="w-4 h-4" />
                                {studentData.personal_info.email}
                            </div>
                            <div className="flex items-center gap-2 text-zinc-300">
                                <Phone className="w-4 h-4" />
                                {studentData.personal_info.phone}
                            </div>
                            <div className="flex items-center gap-2 text-zinc-300">
                                <MapPin className="w-4 h-4" />
                                {studentData.personal_info.address.city}, {studentData.personal_info.address.state}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Academic Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="bg-zinc-900/50 border border-zinc-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-violet-400" />
                                Academic Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-zinc-300">
                                <p className="font-medium">{studentData.enrollment_info.program}</p>
                                <p>Major: {studentData.enrollment_info.major}</p>
                                <p>Minor: {studentData.enrollment_info.minor}</p>
                                <p>Year: {studentData.enrollment_info.current_year}</p>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {studentData.enrollment_info.status}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Current Courses Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card className="bg-zinc-900/50 border border-zinc-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-purple-400" />
                                Current Courses
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {studentData.academic_records[0].courses.map((course, index) => (
                                <div key={index} className="mb-4 p-3 rounded-lg bg-zinc-800/50">
                                    <p className="font-medium text-white">{course.course_name}</p>
                                    <p className="text-sm text-zinc-400">{course.course_code}</p>
                                    <div className="mt-2 flex justify-between text-sm">
                                        <span className="text-blue-400">Grade: {course.grade}</span>
                                        <span className="text-green-400">Attendance: {course.attendance_percentage}%</span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Skills Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Card className="bg-zinc-900/50 border border-zinc-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="w-5 h-5 text-yellow-400" />
                                Skills
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {studentData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded-full text-sm border border-zinc-800 bg-zinc-900/50 text-zinc-300"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default StudentDashboard;