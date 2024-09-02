function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-8 mt-64 p-5">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <h3 className="font-bold mb-4">Shoppee</h3>
        </div>
        <div>
          <h4 className="font-bold mb-4">Learn More</h4>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Exchange Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Order Now
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Our Community</h4>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Special Offers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Customer Reviews
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <p>Contact Number: 123-456-7890</p>
          <p>
            Email Address:{" "}
            <a href="mailto:info@shoppee.com" className="hover:underline">
              info@shoppee.com
            </a>
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Social</h4>
          <div className="flex space-x-4">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8">
        <p>© 2024 Shoppee | All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
