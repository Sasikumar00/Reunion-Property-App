import React from 'react'
import Layout from '../components/Layout'

const AboutPage = () => {
  return (
    <Layout>
        <div className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl text-center font-semibold text-gray-800 mb-4">About Us</h1>

        <div className="bg-white rounded-lg shadow-md p-6 text-xl">
          <p className="text-gray-700 leading-relaxed">
            Welcome to our Property Listing platform! We are passionate about helping you find your dream home or investment property.
          </p>

          <p className="text-gray-700 leading-relaxed mt-4">
            Our mission is to provide you with the best tools and resources to make informed decisions about buying, selling, or renting real estate. Whether you're a first-time homebuyer or an experienced investor, we've got you covered.
          </p>

          <p className="text-gray-700 leading-relaxed mt-4">
            Our team of dedicated professionals is committed to delivering a seamless and enjoyable experience for all your property needs. We offer a wide range of listings, from cozy apartments to spacious family homes, ensuring that you find the perfect property that suits your lifestyle and budget.
          </p>

          <p className="text-gray-700 leading-relaxed mt-4">
            Thank you for choosing us as your trusted real estate partner. We look forward to helping you navigate the exciting world of real estate and finding your ideal property.
          </p>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default AboutPage