"use client";
import { useState, useEffect, useRef, SetStateAction } from "react";
import axios from "axios";
import markdownToTxt from 'markdown-to-txt';
import { Download, Send, Leaf, FileText, Trees, RefreshCw } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import React from "react";
import cookies from "js-cookie";

function Page() {
    const [answer, setAnswer] = useState(null);
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loadingText, setLoadingText] = useState("Cultivating thoughts...");
    const [messages, setMessages] = useState<{ type: string; content: string }[]>([]);
    const user_uuid = cookies.get("user_uuid");
    const inputRef = useRef<HTMLInputElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cookies.get("user_uuid")) {
            window.location.href = "/login";
        }
        let interval: string | number | NodeJS.Timeout | undefined;
        if (loading) {
            const loadingStates = [
                "Cultivating thoughts...",
                "Growing insights...",
                "Nurturing ideas...",
                "Branching possibilities...",
                "Blossoming understanding...",
            ];
            let currentIndex = 0;
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % loadingStates.length;
                setLoadingText(loadingStates[currentIndex]);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [loading]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleDownload = async (content: string) => {
        if (!content) return;

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFontSize(16);
        doc.text("Wisdom Grove Counseling Session", pageWidth / 2, 20, { align: "center" });

        const timestamp = new Date().toLocaleString();
        doc.setFontSize(10);
        doc.text(`Generated on: ${timestamp}`, pageWidth / 2, 30, { align: "center" });

        // Create a temporary div to render the HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        document.body.appendChild(tempDiv);

        // Use html2canvas to capture the HTML content as an image
        const canvas = await html2canvas(tempDiv);
        const imgData = canvas.toDataURL('image/png');

        // Add the image to the PDF
        doc.addImage(imgData, 'PNG', 10, 40, pageWidth - 20, 0);

        // Remove the temporary div
        document.body.removeChild(tempDiv);

        doc.save('wisdom-grove-session.pdf');
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const message = (inputRef.current as HTMLInputElement | null)?.value?.trim() || '';
        if (!message) {
            setError(null);
            setLoading(false);
            return;
        }

        // Add user message to chat
        setMessages(prev => [...prev, { type: 'user', content: message }]);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/ai/create",
                { question: message, user_uuid }
            );

            if (inputRef.current) {
                inputRef.current.value = "";
            }

            // Add AI response to chat
            setMessages(prev => [...prev, { type: 'ai', content: response.data.content }]);
            setAnswer(response.data.content);
        } catch (err) {
            console.error(err);
            setError(null);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateReport = async () => {
        setLoading(true);
        setError(null);
        setReport(null);

        try {
            const response = await axios.get(
                "http://localhost:5000/api/ai/report",
                { params: { user_uuid } }
            );
            setReport(response.data.content);
        } catch (err) {
            console.error(err);
            setError("Failed to generate your reflection journal. Please try again." as unknown as SetStateAction<null>);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-900 to-green-950 text-emerald-50">
            {/* Jungle leaf decorations */}
            <div className="fixed top-0 left-0 w-44 h-44 opacity-20 pointer-events-none">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M20,50 Q60,-20 150,30 T160,110 T60,170 T20,50" fill="#4ade80" />
                </svg>
            </div>
            <div className="fixed bottom-0 right-0 w-60 h-60 opacity-20 pointer-events-none">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M180,50 Q140,-20 50,30 T40,110 T140,170 T180,50" fill="#4ade80" />
                </svg>
            </div>
            <div className="fixed top-32 right-10 w-28 h-28 opacity-15 pointer-events-none animate-float-slow">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M10,20 Q30,5 50,20 T90,20 T50,80 T10,20" fill="#34d399" />
                </svg>
            </div>
            <div className="fixed bottom-32 left-10 w-32 h-32 opacity-15 pointer-events-none animate-float-medium">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M20,10 Q40,30 80,20 T60,60 T20,90 T20,10" fill="#34d399" />
                </svg>
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 md:py-10 flex flex-col h-screen">
                <header className="mb-6 flex items-center justify-center">
                    <div className="flex items-center space-x-2 bg-emerald-950 bg-opacity-70 px-5 py-2.5 rounded-full backdrop-blur-md border border-emerald-800/50 shadow-lg">
                        <Trees className="h-6 w-6 text-emerald-400" />
                        <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-emerald-300 via-green-200 to-teal-300 bg-clip-text text-transparent">
                            WISDOM GROVE
                        </h1>
                        <Leaf className="h-5 w-5 text-emerald-400" />
                    </div>
                </header>

                <main className="flex-grow flex flex-col rounded-xl backdrop-blur-md bg-emerald-950 bg-opacity-40 border border-emerald-800/50 shadow-xl overflow-hidden">
                    {/* Chat history area */}
                    <div
                        ref={chatContainerRef}
                        className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-emerald-700 scrollbar-track-transparent"
                    >
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-24 h-24 relative animate-float">
                                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                        <circle cx="50" cy="50" r="40" fill="#064e3b" />
                                        <path d="M30,40 Q50,20 70,40 T70,60 T50,80 T30,60 T30,40" fill="#059669" stroke="#10b981" strokeWidth="1" />
                                    </svg>
                                </div>
                                <div className="space-y-3 max-w-md">
                                    <h2 className="text-xl  text-emerald-200">Welcome to Wisdom Grove! <span className="text-white font-extrabold">{cookies.get('name')}</span></h2>
                                    <p className="text-emerald-300 text-sm md:text-base">
                                        Share your thoughts, feelings, or questions in a safe space where guidance flourishes.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-3/4 rounded-2xl px-5 py-3.5 shadow ${msg.type === 'user'
                                            ? 'bg-teal-700 bg-opacity-70 text-white ml-12'
                                            : 'bg-emerald-950 bg-opacity-60 border border-emerald-800/50 text-emerald-100 mr-12'
                                            }`}
                                    >
                                        <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                                            {msg.type === 'ai' ? markdownToTxt(msg.content) : msg.content}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="max-w-3/4 rounded-2xl px-5 py-3.5 bg-emerald-950 bg-opacity-60 border border-emerald-800/50 text-emerald-100 mr-12">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                        </div>
                                        <span className="text-emerald-300 text-sm">{loadingText}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input area */}
                    <div className="p-4 border-t border-emerald-800/50 backdrop-blur-md bg-emerald-950 bg-opacity-50">
                        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Share your thoughts or questions here..."
                                className="flex-grow px-4 py-3 bg-emerald-950 bg-opacity-70 border border-emerald-700 rounded-xl text-emerald-50 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-300 disabled:opacity-60"
                                disabled={loading}
                                aria-label="Share your thoughts"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition duration-300 disabled:opacity-50 flex items-center justify-center"
                                disabled={loading}
                                aria-label="Submit question"
                            >
                                <Send size={20} />
                            </button>
                        </form>

                        <div className="mt-3 flex space-x-2">
                            <button
                                onClick={handleGenerateReport}
                                className="flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 px-4 py-2 rounded-lg text-sm font-medium transition duration-300 disabled:opacity-50 border border-emerald-700/50"
                                disabled={loading}
                                aria-label="Generate reflection journal"
                            >
                                <FileText size={16} />
                                <span>Reflection Journal</span>
                            </button>

                            {answer && (
                                <button
                                    onClick={() => handleDownload(answer)}
                                    className="flex items-center justify-center gap-1.5 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 px-4 py-2 rounded-lg text-sm font-medium transition duration-300 border border-emerald-700/50"
                                    aria-label="Download conversation"
                                >
                                    <Download size={16} />
                                    <span>Save Conversation</span>
                                </button>
                            )}

                            <button
                                className="ml-auto flex items-center justify-center gap-1.5 bg-transparent hover:bg-emerald-900/50 text-emerald-400 rounded-lg p-2 transition duration-300 border border-emerald-700/30"
                                aria-label="Start new conversation"
                            >
                                <RefreshCw size={16} />
                            </button>
                        </div>
                    </div>
                </main>

                {/* Report modal */}
                {report && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
                        <div className="bg-emerald-950 border border-emerald-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                            <div className="border-b border-emerald-800 py-4 px-6 flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-emerald-200 flex items-center gap-2">
                                    <FileText size={18} className="text-emerald-400" />
                                    Reflection Journal
                                </h2>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleDownload(report)}
                                        className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm transition duration-300"
                                        aria-label="Download report"
                                    >
                                        <Download size={14} />
                                        <span>Download</span>
                                    </button>
                                    <button
                                        onClick={() => setReport(null)}
                                        className="text-emerald-400 hover:text-emerald-300 p-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 overflow-y-auto max-h-[calc(80vh-4rem)]">
                                <div
                                    className="text-emerald-100 whitespace-pre-wrap font-sans text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: report }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Page;
