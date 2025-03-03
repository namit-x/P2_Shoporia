const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-lg font-medium mb-6">Customer Service</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full">Shipping Information</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full">Returns & Exchanges</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full">Order Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-6">About Us</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full">Our Story</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full">Store Locator</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full">Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-6">Connect With Us</h4>
              <p className="text-gray-600 mb-6">Sign up for exclusive offers, original stories, events and more.</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
