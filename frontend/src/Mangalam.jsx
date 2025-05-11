// MangalamPage.jsx
import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Herosectionlogo from './assets/herosection.jpeg';
import { Link } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from './components/ui/Carousel';
import Testimonial from './components/ui/Testimonial';
import Footer from './components/Footer';

const Mangalam = () => {
  // Refs for scroll animations
  const sectionRefs = {
    planWithEase: useRef(null),
    howItWorks: useRef(null),
    testimonials: useRef(null),
    business: useRef(null)
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section refs
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Cleanup
    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="mangalam-container overflow-hidden">
      <Navbar />
      
      {/* Hero section with parallax effect */}
      <section className='relative h-[600px] md:h-[700px] overflow-hidden'>
        <div className='absolute inset-0 bg-black/30 z-10'></div>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={Herosectionlogo}
            alt='Hero Section Logo' 
            className='absolute inset-0 w-full h-full object-cover transform scale-110 hover:scale-105 transition-transform duration-10000 ease-in-out'
            style={{ transformOrigin: 'center center' }}
          />
        </div>

        <div className='relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-down'>
            Plan Your Perfect <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f0d9d3] to-white">Dream Wedding Day</span>
          </h1>
          <p className='text-xl text-white mb-8 max-w-2xl animate-fade-in-up delay-300'>
            Everything you need to organize your special day, all in one place.
          </p>
          <Link
            to="/signup"
            className="relative overflow-hidden group bg-[#b06a5d] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition duration-300 animate-fade-in-up delay-500"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-[#8d5347] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </Link>
        </div>
      </section>

      {/* Plan With Ease Section */}
      <section ref={sectionRefs.planWithEase} className='py-16 text-center opacity-0 transform translate-y-8 transition-all duration-700 ease-out'>
        <h2 className='text-3xl font-bold mb-8 relative inline-block'>
          Plan With Ease
          <span className="absolute bottom-0 left-0 w-full h-1 bg-[#b06a5d] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6'>
          {[
            { 
              title: 'Budget Tracker', 
              desc: 'Keep track of all your expenses and stay within budget.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 mx-auto text-[#b06a5d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )
            },
            { 
              title: 'Guest Management', 
              desc: 'Manage your guest list, RSVPs, and seating arrangements.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 mx-auto text-[#b06a5d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )
            },
            { 
              title: 'Timeline Planning', 
              desc: 'Create a detailed timeline to ensure a smooth event.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 mx-auto text-[#b06a5d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )
            },
            { 
              title: 'Vendor Directory', 
              desc: 'Find and connect with the best vendors in your area.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 mx-auto text-[#b06a5d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )
            },
          ].map((item, index) => (
            <div 
              key={index} 
              className={`p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition transform hover:-translate-y-1 duration-300 group delay-${index * 100}`}
            >
              {item.icon}
              <h3 className='text-xl font-bold group-hover:text-[#b06a5d] transition-colors'>{item.title}</h3>
              <p className='text-gray-600'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={sectionRefs.howItWorks} className="py-16 px-6 bg-[#f9efe7] opacity-0 transform translate-y-8 transition-all duration-700 ease-out">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-[#e0c9c3] transform -translate-y-1/2 z-0"></div>
            
            {[
              {
                step: 1,
                title: "Create an Account",
                desc: "Sign up and set up your wedding profile with all the important details."
              },
              {
                step: 2,
                title: "Plan Your Wedding",
                desc: "Use our tools to manage your budget, guests, vendors, and timeline."
              },
              {
                step: 3,
                title: "Enjoy Your Day",
                desc: "Relax and enjoy your special day knowing everything is organized."
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative z-10">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-[#b06a5d] shadow-lg transform hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-[#b06a5d]">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={sectionRefs.testimonials} className="py-16 px-6 bg-white opacity-0 transform translate-y-8 transition-all duration-700 ease-out">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Happy Couples
          </h2>
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              <CarouselItem>
                <Testimonial
                  quote="This platform made planning our wedding so much easier! We were able to stay organized and on budget."
                  author="Sarah & Michael"
                  image="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&q=80"
                />
              </CarouselItem>
              <CarouselItem>
                <Testimonial
                  quote="The guest management feature was a lifesaver. We could easily track RSVPs and meal preferences."
                  author="Jessica & David"
                  image="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=200&q=80"
                />
              </CarouselItem>
              <CarouselItem>
                <Testimonial
                  quote="Finding vendors through this platform was so convenient. We found our perfect photographer and caterer!"
                  author="Emily & James"
                  image="https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=200&q=80"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="-left-4 bg-white shadow-lg hover:bg-[#f9efe7] transition-colors" />
            <CarouselNext className="-right-4 bg-white shadow-lg hover:bg-[#f9efe7] transition-colors" />
          </Carousel>
        </div>
      </section>
      
      {/* Business Portal CTA */}
      <section ref={sectionRefs.business} className="py-16 px-6 bg-[#b06a5d] text-center relative overflow-hidden opacity-0 transform translate-y-8 transition-all duration-700 ease-out">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full transform -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full transform translate-x-24 translate-y-24"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-white text-3xl font-bold mb-6">
            Are you a professional planner, vendor or venue?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Join our platform to connect with couples and showcase your services.
          </p>
          <Link to='/signup'>
            <button className="group mt-8 bg-white text-[#b06a5d] px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition relative overflow-hidden shadow-lg hover:shadow-xl">
              <span className="relative z-10 group-hover:text-[#8d5347]">Business Portal</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b06a5d] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </button>
          </Link>
        </div>
      </section>

      <Footer />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default Mangalam;