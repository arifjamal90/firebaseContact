import React, { useState } from 'react';
import constImg from '../assets/contact.jpg';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inputData, setInputData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    message: "Message Type Here"
  });

  const handleInput = (e) => {
    e.preventDefault();
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const addDataHandle = async (e) => {
    e.preventDefault();
    const { firstname, lastname, phone, email, password, message } = inputData;

    try {
      const response = await fetch("https://fir-contact-a2923-default-rtdb.firebaseio.com/userDatabaseRecord.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      if (response.ok) {
        alert("Data Stored");
        setTodos([...todos, { firstname, lastname, phone, email, password, message }]);
        setInputData({ firstname: "", lastname: "", phone: "", email: "", password: "", message: "" });
      } else {
        alert("Data not Stored");
      }
    } catch (error) {
      console.error("Error storing data:", error);
      alert("Error storing data");
    }
  };

  console.log(todos);

  return (
    <div className='bg-gray-100 py-5 flex justify-center px-5'>
    
      <form className='border-2 border-black rounded-md w-[35%]'>
        <p className='text-center py-5 font-semibold'>Contact Form</p>
        <div className='flex justify-between px-2'>
          <label className=''>FirstName</label>
          <label className='w-[48%]'>LastName</label>
        </div>
        <div className='flex justify-between mx-2'>
          <input type="text" className='w-[48%] py-1 border border-gray-400 rounded-md px-2' name="firstname" value={inputData.firstname} onChange={handleInput} />
          <input type="text" className='w-[48%] py-1 border border-gray-400 rounded-md px-2' name="lastname" value={inputData.lastname} onChange={handleInput} />
        </div>
        <label className='w-full px-2'>Phone</label>
        <input type="number" className='w-[96%] mx-2 py-1 border border-gray-400 rounded-md my-2 px-2' name="phone" value={inputData.phone} onChange={handleInput} />
        <label className='w-full px-2'>Email</label>
        <input type="email" className='w-[96%] mx-2 py-1 border border-gray-400 rounded-md my-2 px-2' name="email" value={inputData.email} onChange={handleInput} />
        <label className='w-full px-2'>Password</label>
        <input type="text" className='w-[96%] mx-2 py-1 border border-gray-400 rounded-md my-2 px-2' name="password" value={inputData.password} onChange={handleInput} />
        <label className='w-full px-2'>Message</label>
        <textarea name="message" className='w-[96%] mx-2 py-1 border border-gray-400 rounded-md my-2 px-2' value={inputData.message} onChange={handleInput}></textarea>
        <div className='flex justify-center'>
          <button onClick={addDataHandle} className='border-2 border-green-500 px-20 py-1 my-2 rounded-full'>Add</button>
        </div>
      </form>
    </div>
  );
};

export default Home;
