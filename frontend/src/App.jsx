import { useState } from 'react'
import './App.css'
import logo from "./assets/logo.png";

const App = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Welcome to Education Order! How can I help you today?', time: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [userType, setUserType] = useState('');

  // Suggested replies for the chatbot
  const suggestedReplies = [
    'How do I find an educator?',
    'How much does it cost?',
    'How do I become a tutor?',
    'What subjects are available?'
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      time: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      let botResponse = '';
      
      if (inputMessage.toLowerCase().includes('find') || inputMessage.toLowerCase().includes('educator')) {
        botResponse = 'To find an educator, go to the "Browse Educators" tab. You can filter by subject and view their qualifications before booking a session.';
      } else if (inputMessage.toLowerCase().includes('cost') || inputMessage.toLowerCase().includes('price')) {
        botResponse = 'Educators set their own rates. Most tutors charge around $7-15 per hour depending on subject and experience.';
      } else if (inputMessage.toLowerCase().includes('tutor') || inputMessage.toLowerCase().includes('become')) {
        botResponse = 'To become a tutor, click the "For Educators" button and follow the verification process. You\'ll need to upload your degree certification.';
      } else if (inputMessage.toLowerCase().includes('subject')) {
        botResponse = 'We offer tutoring in Math, English, Spanish, Chinese, and many more subjects. You can browse all available subjects in the educator marketplace.';
      } else {
        botResponse = 'Thanks for your message! Our team will help you with your query soon. Is there anything specific about Education Order you\'d like to know?';
      }
      
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: botResponse,
        time: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };

  const handleSuggestedReply = (reply) => {
    setInputMessage(reply);
    // Focus the input after selecting a suggested reply
    document.getElementById('chatInput').focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white min-h-screen text-black">
      {/* Header */}
      <header className="bg-[#ff33f6] text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2">
            <img className="logo" src={logo} alt="Logo" />
          </div>
          <h1 className="text-2xl font-bold">Education Order</h1>
        </div>
        <div className="space-x-4">
          {!userType && (
            <>
              <button 
                className="bg-white text-[#ff33f6] px-4 py-2 rounded font-medium"
                onClick={() => setUserType('student')}
              >
                For Students
              </button>
              <button 
                className="bg-[#030003] text-white px-4 py-2 rounded font-medium"
                onClick={() => setUserType('educator')}
              >
                For Educators
              </button>
            </>
          )}
          {userType && (
            <button className="bg-white text-[#ff33f6] px-4 py-2 rounded font-medium">
              {userType === 'student' ? 'Student Dashboard' : 'Educator Dashboard'}
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {!userType ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#030003] text-white p-8 rounded-lg shadow-lg mb-8">
              <h2 className="text-3xl font-bold mb-4">One-on-One Learning with Expert Educators</h2>
              <p className="text-lg mb-6">
                Connect with qualified educators for personalized learning in Math, English, Spanish, 
                Chinese, and more. Secure, flexible, and affordable.
              </p>
              <div className="flex space-x-4">
                <button 
                  className="bg-[#ff33f6] text-white px-6 py-3 rounded-lg font-medium"
                  onClick={() => setUserType('student')}
                >
                  Find a Tutor
                </button>
                <button 
                  className="bg-white text-[#030003] px-6 py-3 rounded-lg font-medium"
                  onClick={() => setUserType('educator')}
                >
                  Become an Educator
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border-2 border-[#ff33f6] p-6 rounded-lg shadow">
                <div className="text-[#ff33f6] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">For Students</h3>
                <ul className="space-y-2">
                  <li>✅ Create an Account</li>
                  <li>✅ Browse Verified Educators</li>
                  <li>✅ Book 1:1 Sessions</li>
                  <li>✅ Secure Payment System</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-[#ff33f6] p-6 rounded-lg shadow">
                <div className="text-[#ff33f6] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">For Educators</h3>
                <ul className="space-y-2">
                  <li>✅ Verification Process</li>
                  <li>✅ Set Your Own Rates</li>
                  <li>✅ Manage Bookings</li>
                  <li>✅ Get Paid for Expertise</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-[#ff33f6] p-6 rounded-lg shadow">
                <div className="text-[#ff33f6] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                    <line x1="7" y1="15" x2="7" y2="15"></line>
                    <line x1="11" y1="15" x2="13" y2="15"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Security & Verification</h3>
                <ul className="space-y-2">
                  <li>✅ ID Verification</li>
                  <li>✅ Teaching Agreements</li>
                  <li>✅ Payment Protection</li>
                  <li>✅ Safe Learning Environment</li>
                </ul>
              </div>
            </div>
          </div>
        ) : userType === 'student' ? (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>
            
            <div className="mb-8">
              <div className="bg-[#030003] text-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-bold mb-2">Welcome to Education Order</h3>
                <p>Find your perfect tutor and start learning today. Browse educators by subject or availability.</p>
              </div>
              
              <div className="flex space-x-2 overflow-x-auto py-2">
                <button className="bg-[#ff33f6] text-white px-4 py-2 rounded whitespace-nowrap">All Subjects</button>
                <button className="bg-white border border-[#ff33f6] text-[#ff33f6] px-4 py-2 rounded whitespace-nowrap">Mathematics</button>
                <button className="bg-white border border-[#ff33f6] text-[#ff33f6] px-4 py-2 rounded whitespace-nowrap">English</button>
                <button className="bg-white border border-[#ff33f6] text-[#ff33f6] px-4 py-2 rounded whitespace-nowrap">Spanish</button>
                <button className="bg-white border border-[#ff33f6] text-[#ff33f6] px-4 py-2 rounded whitespace-nowrap">Chinese</button>
                <button className="bg-white border border-[#ff33f6] text-[#ff33f6] px-4 py-2 rounded whitespace-nowrap">Science</button>
                <button className="bg-white border border-[#ff33f6] text-[#ff33f6] px-4 py-2 rounded whitespace-nowrap">History</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Example Educator Cards */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-[#ff33f6] rounded-full flex items-center justify-center text-white font-bold">JD</div>
                      <div className="ml-3">
                        <h3 className="font-bold">John Doe</h3>
                        <p className="text-sm text-gray-600">Mathematics Specialist</p>
                      </div>
                    </div>
                    <div className="bg-[#ff33f6] text-white px-2 py-1 rounded text-sm">$10/hr</div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm">PhD in Mathematics with 5+ years teaching experience. Specializes in Calculus and Algebra.</p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-semibold">Availability:</span> Weekdays evenings, Weekends
                    </div>
                    <button className="bg-[#ff33f6] text-white px-4 py-1 rounded">Book Session</button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-[#030003] rounded-full flex items-center justify-center text-white font-bold">JS</div>
                      <div className="ml-3">
                        <h3 className="font-bold">Jane Smith</h3>
                        <p className="text-sm text-gray-600">English Language Expert</p>
                      </div>
                    </div>
                    <div className="bg-[#ff33f6] text-white px-2 py-1 rounded text-sm">$8/hr</div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm">MA in English Literature. Experienced in teaching writing, grammar, and literature analysis.</p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-semibold">Availability:</span> Daily, flexible hours
                    </div>
                    <button className="bg-[#ff33f6] text-white px-4 py-1 rounded">Book Session</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Educator Dashboard</h2>
            
            <div className="bg-[#030003] text-white p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-xl font-bold mb-2">Become a Verified Educator</h3>
              <p className="mb-4">Share your expertise and earn money by teaching students in your field.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-[#ff33f6] text-white px-4 py-2 rounded">Upload Credentials</button>
                <button className="bg-white text-[#030003] px-4 py-2 rounded">Set Your Rates</button>
              </div>
            </div>
            
            <div className="bg-white border-2 border-[#ff33f6] p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-xl font-bold mb-4">Verification Process</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-[#ff33f6] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 mt-1">1</div>
                  <div>
                    <h4 className="font-semibold">Create Your Profile</h4>
                    <p className="text-sm text-gray-600">Complete your educator profile with your qualifications and teaching experience.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#ff33f6] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 mt-1">2</div>
                  <div>
                    <h4 className="font-semibold">Upload Credentials</h4>
                    <p className="text-sm text-gray-600">Submit your degree certifications and ID for verification.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#ff33f6] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 mt-1">3</div>
                  <div>
                    <h4 className="font-semibold">Set Your Rates</h4>
                    <p className="text-sm text-gray-600">Decide how much to charge per hour for your tutoring services.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#ff33f6] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 mt-1">4</div>
                  <div>
                    <h4 className="font-semibold">Start Teaching</h4>
                    <p className="text-sm text-gray-600">Once verified, you can accept booking requests from students.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        )}
      </main>

      {/* Chatbot Toggle Button */}
      <button 
        className="fixed bottom-6 right-6 bg-[#ff33f6] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50"
        onClick={() => setShowChatbot(!showChatbot)}
      >
        {showChatbot ? 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> : 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        }
      </button>

      {/* Chatbot UI */}
      {showChatbot && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col z-40 border-2 border-[#ff33f6]">
          <div className="bg-[#ff33f6] text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Education Order Assistant</h3>
            <button onClick={() => setShowChatbot(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`mb-3 ${msg.sender === 'user' ? 'text-right' : ''}`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    msg.sender === 'user' 
                      ? 'bg-[#ff33f6] text-white rounded-tr-none' 
                      : 'bg-gray-200 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {msg.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t">
            <div className="mb-2 flex flex-wrap gap-2">
              {suggestedReplies.map((reply, index) => (
                <button 
                  key={index}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded"
                  onClick={() => handleSuggestedReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
            <div className="flex">
              <input
                id="chatInput"
                type="text"
                className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:border-[#ff33f6]"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="bg-[#ff33f6] text-white px-4 rounded-r-lg"
                onClick={handleSendMessage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#030003] text-white p-6 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Education Order</h3>
            <p>Connecting students with qualified educators for personalized learning experiences.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#ff33f6]">Home</a></li>
              <li><a href="#" className="hover:text-[#ff33f6]">For Students</a></li>
              <li><a href="#" className="hover:text-[#ff33f6]">For Educators</a></li>
              <li><a href="#" className="hover:text-[#ff33f6]">Subjects</a></li>
              <li><a href="#" className="hover:text-[#ff33f6]">How It Works</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>📧 Email: support@educationorder.com</li>
              <li>💻 Website: EducationOrder.com</li>
              <li>🚀 GitHub: <a href="https://github.com/kathy20316/EducationOrder" className="text-[#ff33f6]">Education Order on GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p>&copy; 2025 Education Order. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;