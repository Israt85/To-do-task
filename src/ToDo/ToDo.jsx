import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";


const ToDo = () => {
  const { data: task, refetch } = useQuery({
    queryKey: ['item'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/task')
      console.log(task);
      return (res.data)

    }
  })

  const handleDelete = (user) => {
    Swal.fire({
      width:'250px',
        title: "Do you want to delete task?",
        text: `${user?.title}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0c426e",
        cancelButtonColor: "#0c426e",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`http://localhost:5000/task/${user?._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your task has been deleted.",
                            icon: "success"
                        })
                        
                    }
                    refetch()
                })
        }
    });
}  
  
  return (
    <div className="border w-60 lg:w-full mx-auto p-6">
      <h2 className="text-center text-xl">Task List</h2>
      {
        task?.map(item => <div key={item?._id} >
          
<div className="card w-48 lg:w-60 my-2 bg-base-100 shadow-xl">
<div className="card-body">
            <div className="flex justify-between">
              <h2 className="card-title">{item?.title}</h2>
              <button className="btn border-yellow-800">{item?.piority
              }</button>
            </div>
            <p>{item?.description}</p>
            <div className="card-actions justify-center">
                 <button onClick={()=>handleDelete(item)} className="btn bg-yellow-700">Delete</button>
            </div>
          </div>
</div>
          
        </div>)
      }
    </div>
  );
};

export default ToDo;