import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { appContext } from '../context/appContext';

const NewStory = () => {
    const { backendUrl, userData } = useContext(appContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [paragraphs, setParagraphs] = useState([
        { id: 1, text: '', media: null, mediaType: null, color: 'bg-white' }
    ]);

    const colors = [
        { name: 'White', value: 'bg-white' },
        { name: 'Blue', value: 'bg-blue-200' },
        { name: 'Green', value: 'bg-green-200' },
        { name: 'Yellow', value: 'bg-yellow-200' },
        { name: 'Pink', value: 'bg-pink-200' },
        { name: 'Purple', value: 'bg-purple-200' },
    ];

    const addParagraph = () => {
        setParagraphs([
            ...paragraphs,
            { id: Date.now(), text: '', media: null, mediaType: null, color: 'bg-white' }
        ]);
    };

    // Logica per pubblicare la storia
    const publishStory = async () => {
        if (!title.trim()) {
            toast.error("Il titolo è obbligatorio!");
            return;
        }

        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/story/create', {
                userId: userData?._id,
                title,
                paragraphs
            });

            if (data.success) {
                toast.success("Storia pubblicata con successo!");
                navigate('/profile');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const removeParagraph = (id) => {
        if (paragraphs.length > 1) {
            setParagraphs(paragraphs.filter(p => p.id !== id));
        }
    };

    const updateParagraph = (id, field, value) => {
        setParagraphs(paragraphs.map(p =>
            p.id === id ? { ...p, [field]: value } : p
        ));
    };

    const handleMediaChange = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const mediaType = file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : 'audio';
                setParagraphs(paragraphs.map(p =>
                    p.id === id ? { ...p, media: reader.result, mediaType: mediaType } : p
                ));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
            <Navbar />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Crea la tua Nuova Storia</h1>

                    {/* Story Title Input */}
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Titolo della Storia</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Inserisci un titolo magico..."
                            className="w-full text-2xl font-semibold p-4 border-2 border-indigo-100 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all placeholder-gray-300"
                        />
                    </div>

                    {/* Paragraphs List */}
                    <div className="space-y-6">
                        {paragraphs.map((paragraph, index) => (
                            <div
                                key={paragraph.id}
                                className={`p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 ${paragraph.color}`}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-600">Paragrafo {index + 1}</h3>
                                    {paragraphs.length > 1 && (
                                        <button
                                            onClick={() => removeParagraph(paragraph.id)}
                                            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                                            title="Rimuovi paragrafo"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {/* Text Area */}
                                <textarea
                                    value={paragraph.text}
                                    onChange={(e) => updateParagraph(paragraph.id, 'text', e.target.value)}
                                    placeholder="Scrivi qui la parte della storia..."
                                    className="w-full p-4 mb-4 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-200 bg-white/50 min-h-[120px]"
                                />

                                {/* Controls Row */}
                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white/60 p-4 rounded-xl">
                                    {/* Media Input */}
                                    <div className="flex-1">
                                        <label className="flex items-center gap-2 cursor-pointer bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg transition-colors font-medium w-fit">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>Aggiungi Media (Foto/Video/Audio)</span>
                                            <input
                                                type="file"
                                                accept="image/*,video/*,audio/*"
                                                className="hidden"
                                                onChange={(e) => handleMediaChange(paragraph.id, e)}
                                            />
                                        </label>
                                    </div>

                                    {/* Color Picker */}
                                    <div className="flex gap-2">
                                        {colors.map((color) => (
                                            <button
                                                key={color.name}
                                                onClick={() => updateParagraph(paragraph.id, 'color', color.value)}
                                                className={`w-8 h-8 rounded-full border-2 ${paragraph.color === color.value ? 'border-gray-600 scale-110' : 'border-transparent'} shadow-sm transition-transform hover:scale-110`}
                                                style={{ backgroundColor: color.value === 'bg-white' ? '#ffffff' : '' }}
                                                title={color.name}
                                            >
                                                <div className={`w-full h-full rounded-full ${color.value !== 'bg-white' ? color.value : ''} border border-gray-100`}></div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Media Preview */}
                                {paragraph.media && (
                                    <div className="mt-4 relative group">
                                        {paragraph.mediaType === 'image' ? (
                                            <img src={paragraph.media} alt="Preview" className="max-h-64 rounded-lg shadow-md mx-auto" />
                                        ) : paragraph.mediaType === 'video' ? (
                                            <video src={paragraph.media} controls className="max-h-64 rounded-lg shadow-md mx-auto" />
                                        ) : (
                                            <audio src={paragraph.media} controls className="w-full mt-2" />
                                        )}
                                        <button
                                            onClick={() => updateParagraph(paragraph.id, 'media', null)}
                                            className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Add Paragraph Button */}
                    <div className="mt-8 flex justify-center gap-4">
                        <button
                            onClick={addParagraph}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Aggiungi Nuovo Paragrafo
                        </button>
                        <button
                            onClick={publishStory}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Pubblica
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewStory;
