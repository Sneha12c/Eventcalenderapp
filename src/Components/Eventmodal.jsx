import React, { useEffect, useState } from "react";
import { Button } from "./Button.jsx";
import { Input } from "./Input.jsx";

function Eventmodal({ date , event , onClose , onSubmit }){
    const [formData , setFormData] = useState({ name: '', startTime: '', endTime: '', description: '' ,category : '' });
    
    useEffect(()=>{
        if(event){
         setFormData({
            name: event.name,
            startTime: event.startTime,
            endTime: event.endTime,
            description: event.description || '',
            category : event.category || 'Work'
         })
        }
    },[event])
    
    const handleChange = (e)=>{
        setFormData({...formData ,  [e.target.name]: e.target.value })
    }

    const handleSubmit = ()=>{
        onSubmit({...formData , date});
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <h3 className="text-xl font-semibold">Event Details</h3>
          <Input
            label="Event Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Start Time"
            name="startTime"
            type = "time"
            value={formData.startTime}
            onChange={handleChange}
          />
          <Input
            label="End Time"
            name="endTime"
            type = "time"
            value={formData.endTime}
            onChange={handleChange}
          />
          <div>
          <label htmlFor="category" className="block font-bold text-black-600">Category:</label>
          <select
          id="category"
          value={formData.category}
          onChange={handleChange}
          name="category"
          className="w-full px-4 py-2 border border-gray-300 rounded">
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="others">Others</option>
          </select>
         </div>
          <Input
            label="Description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="flex justify-between mt-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </div> 
    )
}

export default Eventmodal;
