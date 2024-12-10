import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-gray-900 text-gray-100">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-orange-500">Contact Me</h1>

        <form className="max-w-lg mx-auto space-y-4">
          <input 
            type="text" 
            placeholder="Name" 
            className="w-full p-2 border rounded-md text-black" 
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-2 border rounded-md text-black" 
          />
          <input 
            type="number" 
            placeholder="Mob-No." 
            className="w-full p-2 border rounded-md text-black" 
          />
          <textarea 
            placeholder="Message" 
            className="w-full p-2 border rounded-md text-black"
          ></textarea>
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
