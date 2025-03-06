import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../redux/store';
import { User, setUser } from '../redux/User/userSlice';

const HomePage = () => {
  const user: User = useSelector((state: RootState) => state.user as User);
  const dispatch = useDispatch();

  useEffect(() => {
    const verify = async () => {
      let res = await fetch('http://localhost:3000/details', {
        method: 'GET',
        credentials: 'include',
      })
      let response = await res.json();
      dispatch(setUser(response.user as User));
    }
    if (user.phone === '') { verify(); }
  }, []);


  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div>
      <Navbar />

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Slideshow */}
        <section className="relative h-[600px]">
          <div
            className="h-full w-full transition-transform duration-500 ease-out bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-6xl font-light mb-6 drop-shadow-lg">{slides[currentSlide].title}</h2>
                <p className="text-xl mb-8 drop-shadow-lg">{slides[currentSlide].subtitle}</p>
                <button className="bg-white text-black px-12 py-4 text-xl hover:bg-gray-100 transition-scale duration-500 ease-out hover:scale-110 font-[500]">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Slideshow Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </section>

        {/* Shopping Domains */}
        <section className="py-24 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-light mb-12 text-center">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div key={category.name} className="group cursor-pointer">
                  <div className="relative h-[500px] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-light hover:text-gray-600 transition-colors">{category.name}</h3>
                    <p className="mt-2 text-gray-600 hover:text-black transition-colors">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Items */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-light mb-12 text-center">Trending Now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {products.map((product) => (
                <div key={product.name} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 text-black px-8 py-3 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Quick Shop
                    </button>
                  </div>
                  <div className="mt-6 text-center">
                    <h4 className="text-lg font-light hover:text-gray-600 transition-colors">{product.name}</h4>
                    <p className="mt-2 text-gray-600 hover:text-black transition-colors">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
};

// Sample data
const slides = [
  {
    title: "Home Collection", // SAME - 2
    subtitle: "Transform your space with luxury",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Spring 2024 Collection", //SAME - 1
    subtitle: "Discover the season's most coveted pieces",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Luxury Essentials",
    subtitle: "Timeless pieces for your wardrobe",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
];

const categories = [
  {
    name: "Designer Collection", // SAME -1
    description: "Luxury fashion from top designers",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Beauty & Wellness",
    description: "Premium beauty and self-care",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2087&q=80"
  },
  {
    name: "Home & Decor", //SAME - 2
    description: "Elevate your living space",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

const products = [
  {
    name: "Silk Evening Dress",
    price: "899",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1483&q=80"
  },
  {
    name: "Leather Tote Bag",
    price: "459",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    name: "Cashmere Sweater",
    price: "599",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
  },
  {
    name: "Designer Watch",
    price: "1,299",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
];

export default HomePage
