import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 text-white">
      {/* Navbar */}
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-1xl md:text-2xl font-bold">Employee Management</h1>
        <div className="flex gap-x-2 md:grid md:grid-cols-2 md:space-x-4">
          <Link
            to="/signup"
            className="px-4 py-2 md:px-6 md:py-2 rounded-lg bg-green-700 hover:bg-green-600 transition-all"
          >
            SignUp
          </Link>
          <Link
            to="/signin"
            className="px-4 py-2 md:px-6 md:py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
          >
            SignIn
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center text-center py-20 px-4">
        <h1 className="text-4xl font-bold md:text-6xl">
          Simplify Employee Management
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-200">
          Manage your employees efficiently with our intuitive and powerful
          tools. Track, manage, and grow your workforce effortlessly.
        </p>
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <Link
            to="/signup"
            className="px-8 py-4 bg-green-600 hover:bg-green-500 text-lg rounded-lg shadow-md transition-all"
          >
            Get Started
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-lg rounded-lg shadow-md transition-all"
          >
            Explore Dashboard
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white text-gray-800 py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold">Features</h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to manage your team effectively.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Employee Directory</h3>
              <p className="mt-2 text-gray-600">
                Easily maintain a directory of all employees with relevant
                details.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Attendance Tracking</h3>
              <p className="mt-2 text-gray-600">
                Track employee attendance and ensure proper time management.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Performance Analytics</h3>
              <p className="mt-2 text-gray-600">
                Get insights into employee performance with detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Employee Management. All rights reserved.</p>
          <div className="mt-4">
            <Link to="/" className="hover:underline mx-2">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:underline mx-2">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
