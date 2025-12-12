import React, { useEffect, useState, useContext } from "react";
import { assets } from "../assets/assets";
import { appContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(appContext);
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        console.log('🔍 Header: backendUrl =', backendUrl);
        console.log('🔍 Header: Full URL =', backendUrl + '/api/story/all');
        const { data } = await axios.get(backendUrl + '/api/story/all');
        console.log('✅ Header: Response received:', data);
        if (data.success) {
          // Add default colors if missing, cycling through colors
          const colors = ["bg-blue-200", "bg-green-200", "bg-yellow-200", "bg-purple-200"];
          const coloredStories = data.stories.map((story, index) => ({
            ...story,
            color: colors[index % colors.length]
          }));
          setUserStories(coloredStories);
        }
      } catch (error) {
        console.error("❌ Error fetching stories:", error);
        console.error("❌ Error response:", error.response);
      }
    };
    fetchStories();
  }, [backendUrl]);

  const handleStoryClick = (storyId) => {
    if (userData) {
      navigate(`/story/${storyId}`);
    } else {
      navigate('/login', { state: { from: `/story/${storyId}` } });
    }
  };

  return (
    <div >
      <section className="text-center flex flex-col items-center w-full py-20">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">User Stories Preview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-10 w-full max-w-6xl">
          {userStories.length > 0 ? (
            userStories.map((story) => (
              <div
                key={story._id}
                onClick={() => handleStoryClick(story._id)}
                className={`${story.color} p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col items-center justify-center h-48 border-4 border-white`}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate px-2 w-full">{story.title}</h3>
                <p className="text-gray-600 line-clamp-3 text-sm">{story.paragraphs?.[0]?.text || "Scopri questa storia..."}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">Nessuna storia disponibile al momento.</p>
          )}
        </div>
      </section>
    </div >
  );
};

export default Header;
