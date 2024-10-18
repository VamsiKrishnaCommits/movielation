import { useState } from 'react'

const CreatorInfo = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 flex items-center"
      >
        <span className="mr-2">About the Creator</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-80 bg-white rounded-lg shadow-xl p-6 text-gray-800">
          <h3 className="font-bold text-xl mb-3 text-purple-600">About the Creator</h3>
          <p className="mb-3">
            Hello! I'm <span className="font-semibold">Vamsi Krishna</span>, the creator of Movielation.
          </p>
          <p className="mb-3">
            I'm passionate about technology and turning innovative ideas into tangible products. 
            In addition to Movielation, I've also built <a href="https://drave.biz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">drave.biz</a>.
          </p>
          <p className="mb-3">
            I love creating tools that bring joy and value to users. If you have any questions or just want to connect, feel free to reach out!
          </p>
          <div className="flex flex-col space-y-2">
            <a href="mailto:vamsi.mosalakanti@gmail.com" className="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              vamsi.mosalakanti@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/vamsi-krishna-105a13172/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn Profile
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreatorInfo
