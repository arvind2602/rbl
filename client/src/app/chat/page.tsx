"use client";
import { useState, useEffect, useRef, SetStateAction } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import markdownToTxt from 'markdown-to-txt';
import { Download, Send } from 'lucide-react';
import { jsPDF } from 'jspdf';
import React from "react";

function Page() {
    const [answer, setAnswer] = useState(null);
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loadingText, setLoadingText] = useState("Analyzing your request...");
    const user_uuid = "user123";
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;
        if (loading) {
            const loadingStates = [
                "Analyzing your request...",
                "Processing data...",
                "Generating response...",
                "Almost there...",
                "Finalizing thoughts...",
            ];
            let currentIndex = 0;
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % loadingStates.length;
                setLoadingText(loadingStates[currentIndex]);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [loading]);

    const handleDownload = (content: string) => {
        if (!content) return;

        const doc = new jsPDF();
        const text = markdownToTxt(content);
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFontSize(16);
        doc.text("AI Assistant Report", pageWidth / 2, 20, { align: "center" });

        const timestamp = new Date().toLocaleString();
        doc.setFontSize(10);
        doc.text(`Generated on: ${timestamp}`, pageWidth / 2, 30, { align: "center" });

        doc.setFontSize(12);
        const splitText = doc.splitTextToSize(text, 170);
        doc.text(splitText, 20, 40);
        doc.save('wisdom-ai-report.pdf');
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

        try {
            const response = await axios.post(
                "http://localhost:5000/api/ai/create",
                { question: message, user_uuid }
            );

            if (inputRef.current) {
                inputRef.current.value = "";
            }
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
            setError("Failed to generate report. Please try again." as unknown as SetStateAction<null>);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-gray-100 pt-32">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-gray-700">
                    <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        WISDOM AI
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="How can I help you today?"
                                className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 disabled:opacity-60 pr-24"
                                disabled={loading}
                                aria-label="Ask a question"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition duration-300 disabled:opacity-50 flex items-center gap-2"
                                disabled={loading}
                                aria-label="Submit question"
                            >
                                <Send size={16} />
                                <span className="hidden sm:inline">Send</span>
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <button
                            onClick={handleGenerateReport}
                            className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-teal-700 transition duration-300 disabled:opacity-50"
                            disabled={loading}
                            aria-label="Generate conversation report"
                        >
                            Generate Conversation Report
                        </button>
                    </div>

                    {error && (
                        <div className="mt-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400 text-center animate-fade-in">
                            {error}
                        </div>
                    )}

                    {loading && (
                        <div className="mt-8 flex flex-col items-center space-y-4 animate-pulse">
                            <div className="flex space-x-3">
                                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            </div>
                            <p className="text-purple-400 font-medium">{loadingText}</p>
                        </div>
                    )}

                    {(answer || report) && (
                        <div className="mt-8 space-y-6">
                            {answer && (
                                <div className="bg-gray-900 bg-opacity-50 p-6 rounded-xl border border-gray-700 shadow-lg animate-fade-in">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold text-purple-400">Response</h2>
                                        <button
                                            onClick={() => handleDownload(answer)}
                                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition duration-300"
                                            aria-label="Download response"
                                        >
                                            <Download size={16} />
                                            <span className="hidden sm:inline">Download</span>
                                        </button>
                                    </div>
                                    <pre className="text-gray-100 whitespace-pre-wrap font-sans text-sm leading-relaxed">{markdownToTxt(answer)}</pre>
                                </div>
                            )}

                            {report && (
                                <div className="bg-gray-900 bg-opacity-50 p-6 rounded-xl border border-gray-700 shadow-lg animate-fade-in">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold text-purple-400">Conversation Report</h2>
                                        <button
                                            onClick={() => handleDownload(report)}
                                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition duration-300"
                                            aria-label="Download report"
                                        >
                                            <Download size={16} />
                                            <span className="hidden sm:inline">Download</span>
                                        </button>
                                    </div>
                                    <pre className="text-gray-100 whitespace-pre-wrap font-sans text-sm leading-relaxed">{markdownToTxt(report)}</pre>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Page;

// Add this CSS in your global stylesheet or as a styled-jsx block
<style jsx global>{`
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fadeIn 0.3s ease-out;
    }
`}</style>