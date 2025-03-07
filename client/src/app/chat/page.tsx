"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import markdownToTxt from 'markdown-to-txt';
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import React from "react";

function Page() {
    const [answer, setAnswer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingText, setLoadingText] = useState("Analyzing your request...");

    useEffect(() => {
        if (loading) {
            const loadingStates = [
                "Analyzing your request...",
                "Processing data...",
                "Generating response...",
                "Almost there...",
                "Finalizing thoughts...",
            ];
            let currentIndex = 0;
            const interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % loadingStates.length;
                setLoadingText(loadingStates[currentIndex]);
            }, 2000);

            return () => clearInterval(interval);
        }
        const response = axios.get("http://127.0.0.1:8000")
        console.log(response)
    }, [loading]);

    const handleDownload = () => {
        if (!answer) return;

        const doc = new jsPDF();
        const text = markdownToTxt(answer);

        // Set title
        doc.setFontSize(16);
        doc.text("AI Assistant Report", 20, 20);

        // Add timestamp
        const timestamp = new Date().toLocaleString();
        doc.setFontSize(10);
        doc.text(`Generated on: ${timestamp}`, 20, 30);

        // Add main content
        doc.setFontSize(12);
        const splitText = doc.splitTextToSize(text, 170);
        doc.text(splitText, 20, 40);

        // Save the PDF
        doc.save('wisdom-ai-report.pdf');
    };

    const handleSubmit = async (e: { preventDefault: () => void; target: any; }) => {
        setLoading(true);
        setError(null);
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const message = formData.get("message")?.toString();
        if (!message || !message.trim()) {
            setError(null);
            setLoading(false);
            return;
        }
        const studentData = {
            "student_id": "S123456",
            "personal_info": {
                "first_name": "Arvind",
                "last_name": "Sharma",
                "date_of_birth": "2001-06-10",
                "gender": "Male",
                "nationality": "Indian",
                "aadhar_number": "1234-5678-9101",
                "contact_info": {
                    "email": "guptaarvind2602@gmail.com",
                    "phone": "+919876543210",
                    "address": {
                        "street": "456, Vasant Vihar",
                        "city": "Delhi",
                        "state": "Delhi",
                        "postal_code": "110057",
                        "country": "India"
                    }
                },
                "personal_interests": [
                    "Reading",
                    "Traveling",
                    "Photography"
                ],
                "profile_picture": "https://example.com/profile/Arvind.jpg"
            },
            "enrollment_info": {
                "enrollment_date": "2019-08-01",
                "program": "Bachelor of Technology",
                "major": "Computer Science",
                "minor": "Data Science",
                "current_year": 4,
                "status": "Active",
                "registration_number": "2020-001234",
                "admission_type": "Regular",
                "scholarship_status": "Merit-Based",
                "previous_institution": "XYZ Junior College",
                "mode_of_admission": "JEE Mains"
            },
            "academic_records": [
                {
                    "semester": "1st Semester",
                    "year": 2019,
                    "courses": [
                        {
                            "course_code": "CS101",
                            "course_name": "Programming Fundamentals",
                            "credits": 4,
                            "grade": "A",
                            "instructor": "Dr. Anil Kumar",
                            "attendance_percentage": 95,
                            "assignments": [
                                {
                                    "title": "Assignment 1",
                                    "due_date": "2019-09-15",
                                    "score": 95
                                },
                                {
                                    "title": "Final Project",
                                    "due_date": "2019-12-01",
                                    "score": 98
                                }
                            ]
                        },
                        {
                            "course_code": "MATH101",
                            "course_name": "Calculus",
                            "credits": 3,
                            "grade": "B+",
                            "instructor": "Ms. Priya Singh",
                            "attendance_percentage": 90,
                            "assignments": [
                                {
                                    "title": "Midterm Exam",
                                    "due_date": "2019-10-15",
                                    "score": 88
                                },
                                {
                                    "title": "Final Exam",
                                    "due_date": "2019-12-15",
                                    "score": 90
                                }
                            ]
                        }
                    ]
                }
                // Additional semesters would be added similarly
            ],
            "financial_info": {
                "tuition_fee": 150000,
                "scholarships": [
                    {
                        "name": "Merit-based Scholarship",
                        "amount": 25000
                    }
                ],
                "payments": [
                    {
                        "payment_date": "2020-07-01",
                        "amount": 75000,
                        "method": "Online Transfer",
                        "receipt_number": "RTN123456"
                    },
                    {
                        "payment_date": "2021-01-10",
                        "amount": 75000,
                        "method": "Bank Transfer",
                        "receipt_number": "RTN654321"
                    }
                ],
                "outstanding_balance": 0
            },
            "extracurricular_activities": [
                {
                    "activity_name": "Robotics Club",
                    "role": "Member",
                    "start_date": "2019-09-01",
                    "end_date": "2021-05-30",
                    "achievements": [
                        "Participated in National Robotics Championship",
                        "Won Best Project Award"
                    ],
                    "meetings_attended": 15
                },
                {
                    "activity_name": "Cultural Fest",
                    "role": "Organizer",
                    "start_date": "2020-02-15",
                    "end_date": "2020-02-20",
                    "responsibilities": [
                        "Coordinated events",
                        "Managed volunteers"
                    ],
                    "feedback": "Successfully executed all events with high participation."
                }
            ],
            "internships": [
                {
                    "company_name": "Tech Solutions Pvt Ltd",
                    "position": "Software Intern",
                    "start_date": "2022-06-01",
                    "end_date": "2022-08-31",
                    "responsibilities": [
                        "Developing web applications",
                        "Collaborating with the design team",
                        "Conducting user testing"
                    ],
                    "feedback": "Exemplary performance, demonstrated great teamwork.",
                    "project": {
                        "name": "E-commerce Platform",
                        "description": "Contributed to the development of a scalable e-commerce solution."
                    }
                }
            ],
            "projects": [
                {
                    "project_title": "AI Chatbot",
                    "description": "Developed an AI-powered chatbot for customer service.",
                    "technologies": [
                        "Python",
                        "TensorFlow",
                        "Flask"
                    ],
                    "duration": "6 months",
                    "team_members": [
                        "Rahul Verma",
                        "Simran Kaur"
                    ],
                    "outcomes": [
                        "Improved customer response time by 30%",
                        "Reduced operational costs by 15%"
                    ]
                },
                {
                    "project_title": "E-commerce Website",
                    "description": "Created a full-stack e-commerce website.",
                    "technologies": [
                        "React",
                        "Node.js",
                        "MongoDB"
                    ],
                    "duration": "4 months",
                    "team_members": [
                        "Sneha Gupta",
                        "Vikram Patel"
                    ],
                    "outcomes": [
                        "Achieved 1000+ user registrations in the first month",
                        "Successfully processed over 500 orders"
                    ]
                }
            ],
            "emergency_contacts": [
                {
                    "name": "Rajesh Sharma",
                    "relationship": "Father",
                    "phone": "+919876543211",
                    "email": "rajesh.sharma@example.com"
                },
                {
                    "name": "Sita Sharma",
                    "relationship": "Mother",
                    "phone": "+919876543212",
                    "email": "sita.sharma@example.com"
                }
            ],
            "previous_education": [
                {
                    "institution_name": "ABC High School",
                    "board": "CBSE",
                    "year_of_passing": 2018,
                    "percentage": 92,
                    "notable_achievements": [
                        "Top 10 in Class",
                        "Winner of Science Exhibition"
                    ]
                },
                {
                    "institution_name": "XYZ Junior College",
                    "board": "State Board",
                    "year_of_passing": 2020,
                    "percentage": 95,
                    "notable_achievements": [
                        "National Merit Award",
                        "Head of Student Council"
                    ]
                }
            ],
            "health_info": {
                "allergies": [
                    "Peanuts",
                    "Dust"
                ],
                "medical_conditions": [
                    "Asthma"
                ],
                "medications": [
                    "Inhaler"
                ],
                "blood_group": "B+",
                "health_insurance_provider": "ICICI Lombard",
                "policy_number": "ICICI123456789"
            },
            "skills": [
                "Programming in Python",
                "Web Development",
                "Machine Learning",
                "Team Leadership",
                "Data Analysis"
            ],
            "languages": [
                {
                    "language": "English",
                    "proficiency": "Fluent"
                },
                {
                    "language": "Hindi",
                    "proficiency": "Fluent"
                },
                {
                    "language": "Bengali",
                    "proficiency": "Basic"
                }
            ],
            "career_goals": [
                "To secure a position in a top tech company.",
                "To work on AI and machine learning projects.",
                "To pursue higher studies abroad."
            ],
            "social_media_profiles": {
                "linkedin": "https://www.linkedin.com/in/Arvind-sharma",
                "github": "https://github.com/Arvindsharma",
                "twitter": "https://twitter.com/Arvind_sharma"
            },
            "personal_statement": "I am a dedicated and passionate student with a keen interest in technology and innovation. I strive to learn and grow continuously, both academically and personally."
        }
        const data = JSON.stringify(studentData);

        try {
            const response = await axios.post("http://127.0.0.1:8000/complete", { message, data });
            form.reset();
            setAnswer(response.data.result.text);
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-gray-100 pt-32">
            <div className="max-w-3xl mx-auto px-4 py-12">
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-gray-700">
                    <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        WISDOM AI
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="How can I help you today?"
                                className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                name="message"
                                disabled={loading}
                                aria-label="Message input"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition duration-200 disabled:opacity-50"
                                disabled={loading}
                            >
                                Send
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div className="mt-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400">
                            {error}
                        </div>
                    )}

                    {loading && (
                        <div className="mt-8 flex flex-col items-center space-y-4">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            </div>
                            <p className="text-purple-400 font-medium">{loadingText}</p>
                        </div>
                    )}

                    {answer && (
                        <div className="mt-6">
                            <div className="bg-gray-900 bg-opacity-50 p-6 rounded-xl border border-gray-700 shadow-lg">
                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={handleDownload}
                                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition duration-200"
                                    >
                                        <Download size={16} />
                                        Download Report
                                    </button>
                                </div>
                                <pre className="text-gray-100 whitespace-pre-wrap font-sans">{markdownToTxt(answer)}</pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Page;