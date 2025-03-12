// src/HomePage.js
import React from "react";
import './index.css';

const Mangalam = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
      <header className="text-center p-10">
        <h1 className="text-6xl font-bold text-white mb-4">Mangalam Weddings</h1>
        <p className="text-xl text-white mb-4">Your Perfect Wedding, Planned with Love</p>
        <button className="px-6 py-3 text-lg bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">
          Get Started
        </button>
      </header>

      <section className="p-12">
        <h2 className="text-4xl font-semibold text-center text-white mb-8">What We Offer</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg w-72 text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Wedding Planner"
              className="mx-auto mb-4 rounded-full"
            />
            <h3 className="text-2xl font-semibold mb-2">Personalized Planning</h3>
            <p>Custom wedding planning to make your day perfect.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg w-72 text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Venue"
              className="mx-auto mb-4 rounded-full"
            />
            <h3 className="text-2xl font-semibold mb-2">Stunning Venues</h3>
            <p>Find the ideal venue that matches your dream wedding theme.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg w-72 text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Decor"
              className="mx-auto mb-4 rounded-full"
            />
            <h3 className="text-2xl font-semibold mb-2">Breathtaking Decor</h3>
            <p>Beautiful decor that brings your wedding vision to life.</p>
          </div>
        </div>
      </section>

      <section className="bg-white p-12 text-center rounded-tl-3xl rounded-tr-3xl mt-12">
        <h2 className="text-4xl font-semibold mb-4">Our Happy Couples</h2>
        <p className="text-lg mb-8">See why our couples love us!</p>
        <div className="flex justify-center gap-8">
          <img
            src="https://via.placeholder.com/100"
            alt="Couple 1"
            className="rounded-full w-24 h-24 border-4 border-pink-300"
          />
          <img
            src="https://via.placeholder.com/100"
            alt="Couple 2"
            className="rounded-full w-24 h-24 border-4 border-pink-300"
          />
          <img
            src="https://via.placeholder.com/100"
            alt="Couple 3"
            className="rounded-full w-24 h-24 border-4 border-pink-300"
          />
        </div>
      </section>

      <footer className="text-center p-10 bg-pink-500 text-white">
        <p>&copy; 2025 Mangalam Weddings. All rights reserved.</p>
        <p>Designed with love for your dream day.</p>
      </footer>
    </div>
  );
};

export default Mangalam;
