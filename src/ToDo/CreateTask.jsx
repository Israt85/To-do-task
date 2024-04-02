import React from 'react';
import ToDo from './ToDo';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

const CreateTask = () => {
    const {
        register,
        handleSubmit,
      } = useForm()
      const onSubmit= (data) => {
        
        console.log(data)
        const obj ={
             title: data.title,
            description : data.description,
            date: data.date,
            piority: data.piority,
        }
        axios.post('http://localhost:5000/task', obj)
        .then(res => {
            console.log(res.data);
           if(res.data.insertedId){
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Your task has been saved!",
              showConfirmButton: false,
              timer: 1500
            });
           }
        })
        .catch(error => {
           console.error('Error creating task:', error);
        });

     document.getElementById('my_modal_3').close()
        }
    return (
        <div className="w-96 mx-auto py-10 flex flex-col lg:flex-row justify-center gap-20">
     
      <button className="btn  bg-yellow-700 text-white" onClick={()=>document.getElementById('my_modal_3').showModal()}>+ Crate New Task</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box h-96 text-black">
    <form method="dialog">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
 
    <form id='myform' onSubmit={handleSubmit(onSubmit)} >
    
      <div>
      <div className="form-control">
          <input type="text" {...register("title")} placeholder="Title" className="input input-bordered" />
        </div>
        <div className="form-control my-2">
        <textarea {...register("description")} className="h-32 textarea textarea-bordered" placeholder="Description"></textarea>
        </div>
        <div className="form-control my-2">
          <input type="datetime-local" {...register("date")}placeholder="Deadline" className="input input-bordered" />
        </div>
        <div className="form-control p-2 my-2 rounded-lg border">
        <select {...register("piority")}>
        <option value="select piority">Select Piority</option>
        <option value="P0">P0</option>
        <option value="P1">P1</option>
        <option value="P2">P2</option>
        </select>

        </div>
        <div className="w-[max-content] mx-auto">
        <button className="btn bg-yellow-700">Submit</button>
        </div>
      </div>
    </form>
    
  </div>
</dialog>
        
        <ToDo/>
                </div>
    );
};

export default CreateTask;