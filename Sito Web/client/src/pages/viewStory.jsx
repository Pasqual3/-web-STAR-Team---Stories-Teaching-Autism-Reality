import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { appContext } from '../context/appContext';

const ViewStory = () => {
    const { backendUrl } = useContext(appContext);
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                axios.defaults.withCredentials = true;
                const { data } = await axios.get(`${backendUrl}/api/story/${id}`);
                if (data.success) {
                    setStory(data.story);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStory();
    }, [backendUrl, id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!story) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
                <Navbar />
                <div className="flex justify-center items-center h-[80vh]">
                    <h2 className="text-2xl text-gray-600">Storia non trovata</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
            <Navbar />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">{story.title}</h1>

                    <div className="space-y-8">
                        {story.paragraphs.map((paragraph, index) => (
                            <div
                                key={index}
                                className={`p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 ${paragraph.color}`}
                            >
                                {/* Media Display */}
                                {paragraph.media && (
                                    <div className="mb-6">
                                        {paragraph.mediaType === 'image' ? (
                                            <img src={paragraph.media} alt="Story Media" className="max-h-96 rounded-xl shadow-md mx-auto object-contain" />
                                        ) : paragraph.mediaType === 'video' ? (
                                            <video src={paragraph.media} controls className="max-h-96 rounded-xl shadow-md mx-auto" />
                                        ) : (
                                            <audio src={paragraph.media} controls className="w-full" />
                                        )}
                                    </div>
                                )}

                                {/* Text Display */}
                                <p className="text-xl text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
                                    {paragraph.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewStory;