"use client"
import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Home,
  User,
  Mail,
  Phone,
  XCircle,
  CheckCircle,
  X,
  Menu,
  MapPin, 
  ArrowUp,
} from "lucide-react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

const Header = ({ toggleContactModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSetActive = (section) => {
    setActiveSection(section);

    // Smooth scroll to the target section
    const target = document.getElementById(section);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setIsMenuOpen(false); // Close menu on mobile after selecting
  };

  return (
    <header className="bg-gradient-to-r from-[#1E2A47] to-[#4B6584] shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 flex justify-between items-center space-x-8">
        {/* Logo */}
        <div className="text-white text-4xl font-bold flex items-center space-x-2">
          <Home className="w-8 h-8 text-gradient-to-r from-[#1A80B9] to-[#34B3F1]" />
          <span className="text-xl font-semibold">Pareena</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex space-x-8">
          {["overview", "site-plan", "amenities", "gallery", "location"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => {
                e.preventDefault();
                handleSetActive(section);
              }}
              className={`text-lg font-medium text-white hover:text-[#34B3F1] transition-all duration-300 ${
                activeSection === section
                  ? "border-b-2 border-[#34B3F1] pb-2"
                  : ""
              }`}
            >
              <span className="capitalize">{section.replace("-", " ")}</span>
            </a>
          ))}
        </nav>

        {/* Contact Us Button (Desktop) */}
        <button
          onClick={toggleContactModal}
          className="hidden sm:block bg-gradient-to-r from-[#34B3F1] to-[#1A80B9] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#1A80B9] hover:to-[#34B3F1] transition-all duration-300"
        >
          Contact Us
        </button>

        {/* Hamburger Icon for Mobile */}
        <button
          className="sm:hidden text-white hover:text-[#34B3F1] focus:outline-none"
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Off-Canvas Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden">
          <div className="absolute top-0 left-0 w-72 h-full bg-white shadow-xl flex flex-col p-6">
            <div className="flex justify-between items-center">
              <div className="text-[#1E2A47] text-3xl font-bold">
                Abhinandan Lodha
              </div>
              <button
                className="text-[#34B3F1] hover:text-[#1A80B9]"
                onClick={handleMenuToggle}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col space-y-6 mt-6">
              {["overview", "site-plan", "amenities", "gallery", "location"].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSetActive(section);
                  }}
                  className={`text-lg font-medium ${
                    activeSection === section
                      ? "text-[#34B3F1]"
                      : "text-[#1E2A47] hover:text-[#34B3F1]"
                  }`}
                >
                  <span className="capitalize">{section.replace("-", " ")}</span>
                </a>
              ))}
            </nav>
            {/* Contact Us Button in Mobile Menu */}
            <div className="mt-8">
              <button
                onClick={toggleContactModal}
                className="w-full bg-gradient-to-r from-[#34B3F1] to-[#1A80B9] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#1A80B9] hover:to-[#34B3F1] transition-all duration-300"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const property = {
  name: "Luxury 2 BHK Apartment",
  description:
    "Located in the heart of the city, this 2 BHK luxury apartment offers a perfect blend of comfort and convenience.",
  price: "₹85 Lakhs",
  sitePlan: "/Pareena Coban Brochure  new 28-03-2024_page-0028.jpg",
  amenities: [
    {
      name: "Swimming Pool",
      gallery: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTNxznSwAIXI1WoYDtP0UFWEzLGVQZtjb-g&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXENac8ZaX5_rMoYqritiUCaV0RPLZxZuy3w&s",
      ],
      description: "Relax and unwind in our spacious and luxurious swimming pool.",
    },
    {
      name: "Gym",
      gallery: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSozvIQyEx6N-sbtrChdHKh1LQZAbVyQo09_Q&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT02fRs8LlyMmVm8IHF-htXILRU1y0BFcMWsw&s",
      ],
      description: "Stay fit and healthy with state-of-the-art gym facilities.",
    },
    {
      name: "Clubhouse",
      gallery: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6O9mEI9-ia52c6GttJgfCr9VzEwZzlxjv4A&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeYiwUnvsVRjM-gDiEYXRhLDjnrW5hdFoV_A&s",
      ],
      description: "A perfect place to socialize and enjoy recreational activities.",
    },
    {
      name: "24/7 Security",
      gallery: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcy-rZQXQgtru6wAlhb22zOPTPKoi1P1_3qg&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSBf-KYHS7ezvi3G5xxV_hIgsovQaMpRseVA&s",
      ],
      description: "Your safety is our priority with round-the-clock security services."
    },
    {
      name: "Garden",
      gallery: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs8UUh3X6XTvzasuWkEbdwA8XQEumYH4FDxw&s",
                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6s-sSg5MaLXx2C1IxD4okDqY2Uxevvtj_4w&s"
      ],
      description: "Enjoy the serene beauty of our lush, landscaped gardens."
    },
    {
      name: "Parking",
      gallery: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKxcM7TmRb7XqjBSDHbopyh5WWVPyNOQ4TSw&s",
                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr53S4fPSginyjsp695iVRafghFA4jB3FspA&s",
      ],
      description: "Ample parking space with secure and convenient access."
    },
  ],
  
  gallery: {
    "living-room": [
      "/Pareena Coban Brochure  new 28-03-2024_page-0001.jpg",
      "/Pareena Coban Brochure  new 28-03-2024_page-0002.jpg",
      "/Pareena Coban Brochure  new 28-03-2024_page-0003.jpg",
      "/Pareena Coban Brochure  new 28-03-2024_page-0004.jpg",
      "/Pareena Coban Brochure  new 28-03-2024_page-0005.jpg",
      "/Pareena Coban Brochure  new 28-03-2024_page-0006.jpg",
      "/Pareena Coban Brochure  new 28-03-2024_page-0007.jpg",
      "/Pareena Coban Brochure  new 28-03-2024_page-0008.jpg",
      "/Pareena Coban Brochure  new 28-03-2024_page-0009.jpg",
      "/Pareena Coban Brochure  new 28-03-2024_page-0010.jpg",
      "/Pareena Coban Brochure  new 28-03-2024_page-0011.jpg",
      "/Pareena Coban Brochure  new 28-03-2024_page-0012.jpg",
      "/Pareena Coban Brochure  new 28-03-2024_page-0013.jpg",
      "/Pareena Coban Brochure  new 28-03-2024_page-0014.jpg",
      "/Pareena Coban Brochure  new 28-03-2024_page-0015.jpg",
    ],
    bedroom: [
      "https://via.placeholder.com/600x400?text=Bedroom+1",
      "https://via.placeholder.com/600x400?text=Bedroom+2",
    ],
    kitchen: [
      "https://via.placeholder.com/600x400?text=Kitchen+1",
      "https://via.placeholder.com/600x400?text=Kitchen+2",
      "https://via.placeholder.com/600x400?text=Kitchen+3",
      "https://via.placeholder.com/600x400?text=Kitchen+4",
      "https://via.placeholder.com/600x400?text=Kitchen+5",
      "https://via.placeholder.com/600x400?text=Kitchen+6",
      "https://via.placeholder.com/600x400?text=Kitchen+7",
    ],
    bathroom: [
      "https://via.placeholder.com/600x400?text=Bathroom+1",
      "https://via.placeholder.com/600x400?text=Bathroom+2",
    ],
  },
  location: "Sector 93, Gurugram, Haryana, India",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7018.310079830329!2d76.92751414605549!3d28.414578303137674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d160474ddc10b%3A0xd6b8829d75aea6fc!2sSector%2093%2C%20Gurugram%2C%20Haryana%20122505!5e0!3m2!1sen!2sin",
};

// Helper functions for icons and title case conversion

const toTitleCase = (str) =>
  str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// Contact Modal Component
const ContactModal = ({ isOpen, toggleContactModal }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    mode: "onTouched",
  });

  const apiKey = process.env.PUBLIC_ACCESS_KEY || "37ea35aa-5ee1-4c0a-8036-6dba06d78951";

  const { submit: onSubmit } = useWeb3Forms({
    access_key: apiKey,
    settings: {
      from_name: "Acme Inc",
      subject: "New Contact Message from your Website",
    },
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
    },
  });

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      toggleContactModal();
      setIsExiting(false);
    }, 500);
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <div
        className={`bg-white rounded-2xl shadow-lg w-[90%] lg:max-w-4xl mx-auto  p-8 flex flex-col md:flex-row transition-all duration-500 ease-in-out ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Left Section: Image (hidden on mobile and tablet) */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 hidden md:block">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo9qE01gKtTonUxusOPI2QxfUFyIwCgJW_TQ&s" // Replace with your desired image URL
            alt="Placeholder"
            className="w-full h-full object-contain rounded-2xl"
          />
        </div>

        {/* Right Section: Form */}
        <div className="lg:max-w-2xl max-w-2xl md:max-w-2xl pl-0 md:pl-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">Get in Touch</h2>
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800 transition-all duration-300"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  <User className="w-5 h-5 inline text-blue-600" /> Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className={`mt-2 w-full px-4 py-3 border-b outline-none ${
                    errors.name ? "border-red-600" : "border-gray-300"
                  } rounded-md text-black`}
                  {...register("name", {
                    maxLength: 80,
                  })}
                />
                {errors.name && (
                  <div className="mt-1 text-red-600">
                    <small>{errors.name.message}</small>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  <Mail className="w-5 h-5 inline text-blue-600" /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className={`mt-2 w-full px-4 py-3 border-b outline-none ${
                    errors.email ? "border-red-600" : "border-gray-300"
                  } rounded-md text-black`}
                  {...register("email", {
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <div className="mt-1 text-red-600">
                    <small>{errors.email.message}</small>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                <Phone className="w-5 h-5 inline text-blue-600" /> Phone
              </label>
              <div className="relative mt-2">
                <input
                  type="tel"
                  id="phone"
                  placeholder="Your Phone"
                  className={`w-full px-4 py-3 border-b outline-none ${
                    errors.phone ? "border-red-600" : "border-gray-300"
                  } rounded-md pl-10 text-black`}
                  {...register("phone", {
                    required: "Enter your phone number",
                  })}
                />
              </div>
              {errors.phone && (
                <div className="mt-1 text-red-600">
                  <small>{errors.phone.message}</small>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                <span className="text-gray-600">Comment</span>
              </label>
              <div className="relative mt-2">
                <textarea
                  id="comment"
                  placeholder="Your Message"
                  className={`w-full px-4 py-3 border-b outline-none ${
                    errors.comment ? "border-red-600" : "border-gray-300"
                  } rounded-md pl-10 text-black`}
                  {...register("comment", {
                    maxLength: 500,
                  })}
                />
              </div>
              {errors.comment && (
                <div className="mt-1 text-red-600">
                  <small>{errors.comment.message}</small>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="consent"
                  className="h-4 w-4 text-blue-600"
                  {...register("consent", { required: true })}
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  I authorize company representatives to Call, SMS, Email or WhatsApp me.
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="submit"
                className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-md font-medium hover:from-blue-700 hover:to-blue-600 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" /> <span>Submit</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {isSubmitSuccessful && (
            <div
              className={`mt-8 px-6 py-4 rounded-md shadow-md text-center transition-all duration-300 ${
                isSuccess
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {isSuccess ? (
                <>
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <p className="font-medium">{message || "Message sent successfully!"}</p>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 mx-auto mb-2 text-red-600" />
                  <p className="font-medium">{message || "Something went wrong. Please try again."}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};


const AmenitiesSection = ({ toggleContactModal }) => {
  return (
    <section id="amenities" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2
          className="text-6xl font-extrabold mb-12 text-gray-800 text-left"
          data-aos="fade-right"
        >
          Amenities
        </h2>

        {/* Amenities List */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"  onClick={toggleContactModal} >
          {property.amenities.map((amenity, index) => (
            <li
              key={index}
              className="group relative flex flex-col items-center justify-start bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-transform transform hover:scale-105 overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay={`${index * 100}`}
            >
              {/* Carousel */}
              <div className="w-full h-64 relative overflow-hidden">
                <Carousel images={amenity.gallery} />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                {/* Name */}
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {amenity.name}
                </h3>
                {/* Description */}
                <p className="mt-3 text-sm text-gray-600 group-hover:text-gray-800 transition">
                  {amenity.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// Custom Carousel Component
const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-full">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-auto max-w-full transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};


// App Component
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false); // State for Scroll to Top Button
  const [selectedImage, setSelectedImage] = useState("");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const toggleContactModal = () =>
    setIsContactModalOpen((prev) => !prev);

  const handleViewImage = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      offset: 100,    // Offset (in px) from the original trigger point
      easing: "ease-in-out", // Easing function
      once: true,      // Whether animation should happen only once - while scrolling down
    });
  }, []);

  useEffect(() => {
    // Scroll event listener to toggle the scroll to top button
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleModal = () => setIsModalOpen((prev) => !prev);


  const galleryRef = useRef(null); // Reference to the gallery container
  const [galleryImages, setGalleryImages] = useState([]); // State for gallery images
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  useEffect(() => {
    // Initialize gallery images with original data
    setGalleryImages(Object.values(property.gallery).flat());
  }, []);

  useEffect(() => {
    const scrollGallery = () => {
      if (!galleryRef.current || isHovered) return;

      const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;

      // If the scroll reaches the end, duplicate the gallery
      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        setGalleryImages((prevImages) => [
          ...prevImages,
          ...Object.values(property.gallery).flat(),
        ]);
        galleryRef.current.scrollBy({ left: 1, behavior: "smooth" });
      } else {
        galleryRef.current.scrollBy({ left: 2, behavior: "smooth" });
      }
    };

    const interval = setInterval(scrollGallery, 50); // Adjust scroll speed

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isHovered, galleryImages]);
 


  return (
    <div className="bg-gray-50">
     <Header toggleContactModal={toggleContactModal} />
      <ContactModal
        isOpen={isContactModalOpen}
        toggleContactModal={toggleContactModal}
      />
  
    {/* Property Overview */}
    <section
  id="overview"
  className="py-24 px-6 sm:px-8 bg-gradient-to-r from-[#f8f9fa] via-[#e5e8eb] to-[#d0d7db] relative"
  data-aos="fade-up"
>
  <div className="max-w-7xl mx-auto flex flex-col-reverse sm:flex-row items-center space-y-12 sm:space-y-0 sm:space-x-12">
    
    {/* Left Side - Image with Overlay */}
    <div className="relative flex-none sm:w-1/2">
      <img
        src="/Pareena Coban Brochure  new 28-03-2024_page-0003.jpg" // Replace with your image URL
        alt="Property Image"
        className="w-full h-auto rounded-xl shadow-xl object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-40 rounded-xl"></div> {/* Overlay Effect */}
    </div>

    {/* Right Side - Text */}
    <div className="flex-1 space-y-4 sm:space-y-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight text-center sm:text-left">
        Coban. 10.58 Acres of Pure Bliss.
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed text-center sm:text-left">
        Our homes are more than mere structures; they're gateways to a life well-lived. 
        Welcome to a place where your dreams find their address. With more than 200 families 
        already living in Coban, join us as we launch two new towers today.
      </p>

      {/* Property Features */}
      <ul className="space-y-2 text-gray-700 text-lg list-disc pl-6 text-center sm:text-left">
        <li>• Gateway to a fulfilling life</li>
        <li>• Luxury living spaces</li>
        <li>• Surrounded by greenery and ample amenities</li>
        <li>• Located in the heart of the city</li>
      </ul>

      {/* Call to Action */}
      <div className="text-center sm:text-left">
        <a
          href="#contact"
          className="inline-block px-8 py-3 mt-6 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-300"
        >
          Book a Visit
        </a>
      </div>
    </div>
  </div>
    </section>

    {/* Gallery Section */}
    <section
  id="gallery"
  className="py-16 px-4 sm:px-8 bg-gradient-to-br from-gray-100 to-gray-200"
>
  <div className="max-w-7xl mx-auto">
    {/* Section Title */}
    <div className="text-left mb-12">
      <h2 className="text-5xl font-extrabold text-gray-800 tracking-wide">
        <span className="bg-clip-text text-black bg-gradient-to-r from-blue-500 to-green-500">
          Property Gallery
        </span>
      </h2>
      <p className="text-lg text-gray-600 mt-4">
      plot for sale in mumbai .
      </p>
    </div>

    {/* Modern Background with Inset Shadow */}
    <div
      className="relative py-8 px-6 bg-white rounded-xl shadow-inner"
      onMouseEnter={() => setIsHovered(true)} // Pause autoplay on hover
      onMouseLeave={() => setIsHovered(false)} // Resume autoplay on leave
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50 blur-sm rounded-xl"></div>

      {/* Horizontal Scrollable Image Row */}
      <div
        ref={galleryRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide p-4"
      >
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="flex-none w-80 sm:w-96 lg:w-[500px] relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-b from-gray-50 to-gray-100 hover:shadow-2xl hover:bg-gradient-to-t from-gray-700 via-gray-500 to-gray-300 transform transition-all duration-300"
            onClick={() => handleViewImage(image)}
            data-aos="zoom-in"
          >
            <img
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-64 sm:h-80 lg:h-96 object-contain rounded-t-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-80 transition-opacity duration-300 rounded-xl">
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-semibold text-lg">Luxury Property</p>
                <p className="text-sm opacity-75">Click to view details</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Modal for Viewing Image */}
  {isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl`}>
        <button
          className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
          onClick={closeModal}
        >
          <X />
        </button>
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full max-h-[80vh] object-contain"
        />
      </div>
    </div>
  )}
    </section>

 
    {/* Site Plan */}
    <section
  id="site-plan"
  className="py-12 sm:py-16 px-6 sm:px-10 bg-gradient-to-b from-gray-100 to-gray-200 relative"
  data-aos="fade-up"
  onClick={toggleContactModal}
>
  <div className="max-w-7xl mx-auto relative">
    {/* Section Header */}
    <div className="text-left mb-8 sm:mb-12 px-4">
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <span className="bg-clip-text text-black bg-gradient-to-r from-blue-500 to-green-500">
          Luxurious Site Plan
        </span>
      </h2>
      <p
        className="text-base sm:text-lg lg:text-xl text-gray-600 mt-4"
        data-aos="fade-right"
        data-aos-delay="300"
      >
        Plot rate in Mumbai.
      </p>
    </div>

    {/* Site Plan Image */}
    <div
      className="relative rounded-2xl overflow-hidden border border-gray-200  transition-all duration-700 transform hover:scale-105"
      data-aos="zoom-in"
      data-aos-delay="400"
    >
      {/* Image */}
      <img
        src={property.sitePlan}
        alt="Luxury Site Plan"
        className="w-full h-[250px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-contain rounded-2xl"
      />
    </div>
  </div>
    </section>


    {/* Amenities */}
    <AmenitiesSection toggleContactModal={toggleContactModal}/>
  
    {/* Location */}
    <section
  id="location"
  className="py-12 sm:py-16 px-6 sm:px-12 bg-gradient-to-br from-gray-100 to-gray-300 relative"
  data-aos="fade-up"
>
  <div className="max-w-7xl mx-auto relative">
    {/* Decorative Background */}
    <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-200 via-gray-100 to-green-200 rounded-lg blur-xl opacity-60 pointer-events-none sm:w-96 sm:h-96 w-80 h-80"></div>

    {/* Section Header */}
    <div className="text-left mb-8 sm:mb-12">
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <span className="bg-clip-text text-black bg-gradient-to-r from-blue-600 to-green-500">
          Prime Location
        </span>
      </h2>
      <p
        className="text-sm sm:text-base lg:text-lg text-gray-600 mt-4"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        {property.location}
      </p>
    </div>

    {/* Map Section */}
    <div
      className="relative rounded-3xl overflow-hidden border border-gray-200 transition-all duration-700 transform hover:scale-105 cursor-pointer"
      data-aos="zoom-in"
      data-aos-delay="400"
      onClick={toggleContactModal} // Trigger contact modal on click
    >
      {/* Embedded Map */}
      <iframe
        title="Property Location"
        src={property.mapEmbedUrl}
        className="w-full h-[250px] sm:h-[350px] lg:h-[450px] xl:h-[500px] rounded-3xl pointer-events-none" // Responsive iframe height
        allowFullScreen
        loading="lazy"
      ></iframe>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50 opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none"></div>
    </div>
  </div>
    </section>


    {/* Footer */}
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 sm:px-8" data-aos="fade-up">
  <div className="max-w-7xl mx-auto">
    {/* Links Section */}
    <ul className="flex justify-center space-x-6 mb-4" data-aos="fade-up">
      <li>
        <a href="#privacy-policy" className="hover:text-blue-500 transition">
          Privacy Policy
        </a>
      </li>
      <li>
        <a href="#terms-conditions" className="hover:text-blue-500 transition">
          Terms & Conditions
        </a>
      </li>
    </ul>

    {/* Divider */}
    <div className="border-t border-gray-700 my-6"></div>

    {/* Disclaimer Section */}
    <div className="text-center text-sm text-gray-400 leading-relaxed" data-aos="fade-up">
      <p className="mb-4">
        Disclaimer: The content provided on this website is for informational purposes only and does not constitute an offer to avail any service. The prices mentioned are subject to change without prior notice, and the availability of properties mentioned is not guaranteed.
      </p>
      <p>
        Users are advised to conduct independent research and due diligence before making any decisions.
      </p>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-700 my-6"></div>

    {/* Copyright Section */}
    <div className="text-center text-sm text-gray-500" data-aos="fade-up">
      © {new Date().getFullYear()} Propcodes. All rights reserved.
    </div>
  </div>
    </footer>

    
   {/* Scroll to Top Button */}
   {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  
  );
};


export default App;
