import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { appContext } from '../context/appContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const { userData, backendUrl } = useContext(appContext);
    const [stories, setStories] = useState([]);

    const fetchUserStories = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.get(backendUrl + '/api/story/my-stories');
            if (data.success) {
                setStories(data.stories);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (userData) {
            fetchUserStories();
        }
    }, [userData]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                    <div className="flex items-center gap-6 mb-8 border-b border-gray-100 pb-8">
                        <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                            {userData ? userData.name[0].toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Ciao, {userData ? userData.name : 'Utente'}!
                            </h1>
                            <p className="text-gray-500 text-lg">Benvenuto nel tuo profilo</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Le tue Storie Pubblicate</h2>

                    {stories.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-500 text-lg mb-4">Non hai ancora scritto nessuna storia magica.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {stories.map((story) => (
                                <div key={story._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                                    <div className={`h-2 bg-gradient-to-r from-purple-400 to-pink-500`}></div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate" title={story.title}>{story.title}</h3>
                                        <p className="text-gray-400 text-sm mb-4">
                                            Pubblicata il: {new Date(story.createdAt).toLocaleDateString()}
                                        </p>
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">
                                                {story.paragraphs.length} Paragrafi
                                            </span>
                                            {/* Future: Add 'Read Story' button linking to a story view page */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
