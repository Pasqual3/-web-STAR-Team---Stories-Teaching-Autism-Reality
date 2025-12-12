import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { appContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { userData } = useContext(appContext);

  //questa sara una query che recuperare le user story 
  const userStories = [
    { title: "Morning Routine", desc: "Start your day right", color: "bg-blue-200" },
    { title: "Going to School", desc: "Learning and playing", color: "bg-green-200" },
    { title: "Playing with Friends", desc: "Sharing and caring", color: "bg-yellow-200" },
    { title: "Bedtime", desc: "Rest for tomorrow", color: "bg-purple-200" },
  ];

  return (
    < div >
      <section className="text-center flex flex-col items-center w-full py-20 bg-gradient-to-r from-pink-100 to-purple-300">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">User Stories Preview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-10 w-full max-w-6xl">
          {userStories.map((story, index) => (
            <div
              key={index}
              className={`${story.color} p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col items-center justify-center h-48 border-4 border-white`}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{story.title}</h3>
              <p className="text-gray-600">{story.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div >
  );
};

export default Header;
