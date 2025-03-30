
import React from 'react';
import Navbar from '../Component/Navbar';

import Herosectionlogo from './assets/herosection.jpeg'
import { Link, useNavigate } from 'react-router-dom';
import { Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious, } from '../Component/ui/Carousel';
import Testimonial from '../Component/ui/Testimonial';
import Footer from '../Component/ui/Testimonial'



const Mangalam = () => {



  return (
    <div className="mangalam-container">
     <Navbar />
     {/* Hero section */}
     <section className='relative h-[600px] overflow-hidden'>
        <div className='absolute inset-0 bg-black/30 z-10'></div>
        <img
          src = {Herosectionlogo}
          alt = 'Hero Section Logo' 
          className='absolute inset-0 w-full h-full object-cover'
          />

        <div className='relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4'>
              Plan Your Perfect Dream Wedding Day
            </h1>
            <p className='text-xl text-white mb-8 max-w-2xl'>
                Everything you need to organize your special day, all in one place.
            </p>
            <Link
                    to="/signup"
                    className="bg-[#b06a5d] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#8d5347] transition duration-300"
                  >
                    Get Started
                  </Link>

        </div>
     </section>
       {/* Plan With Ease Section */}
       <section className='py-16 text-center'>
        <h2 className='text-3xl font-bold mb-8'>Plan With Ease</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6'>
          {[
            { title: 'Budget Tracker', desc: 'Keep track of all your expenses and stay within budget.' },
            { title: 'Guest Management', desc: 'Manage your guest list, RSVPs, and seating arrangements.' },
            { title: 'Timeline Planning', desc: 'Create a detailed timeline to ensure a smooth event.' },
            { title: 'Vendor Directory', desc: 'Find and connect with the best vendors in your area.' },
          ].map((item, index) => (
            <div key={index} className='p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition'>
              <h3 className='text-xl font-bold'>{item.title}</h3>
              <p className='text-gray-600'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-[#f9efe7]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#b06a5d]">
                <span className="text-xl font-bold text-[#b06a5d]">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-600">
                Sign up and set up your wedding profile with all the important
                details.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#b06a5d]">
                <span className="text-xl font-bold text-[#b06a5d]">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Plan Your Wedding</h3>
              <p className="text-gray-600">
                Use our tools to manage your budget, guests, vendors, and
                timeline.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#b06a5d]">
                <span className="text-xl font-bold text-[#b06a5d]">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy Your Day</h3>
              <p className="text-gray-600">
                Relax and enjoy your special day knowing everything is
                organized.
              </p>
            </div>
          </div>
        </div>
      </section>
{/* Testimonials Section */}
<section className="py-16 px-6 bg-white">
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
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </div>
      </section>
      
    <section className="py-8 px-6 bg-[#b06a5d] text-center">
        <div className="container mx-auto max-w-4xl">
    <h2 className="text-white text-3xl font-bold  mb-6">
      Why Plan Your Wedding with Us?
    </h2>
    <p className="text-white text-lg mb-8">
      We provide all the tools you need to create the perfect wedding, stress-free!
    </p>
   <Link to={'/signup'}>
    <button className="mt-8 bg-white text-[#b06a5d] px-6 py-3 rounded-md text-lg hover:bg-gray-100 transition">
      Start Planning Now
    </button>
    </Link>
  </div>  
</section>
      <Footer />  
    </div>
  );
};

export default Mangalam;