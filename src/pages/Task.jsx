import React, { useState } from 'react'

function Task() {
    const [taskList,setTaskList]=useState([])
    const [formData,setFormData] =useState({
        name:"",assignby:"",assignto:"",date:
        ''
    });
    const {name,assignby,assignto,date}=formData
    const handleChange = (e)=>{
        setFormData({...formData,
            [e.target.name]:e.target.value
        })
    }
    console.log("form data",formData)
    const handleAdd = ()=>{
        if(name&&assignby&&assignto&&date){
            const new1 = {...formData,["id"]:Math.floor(Math.random()*10000)}
            setTaskList([...taskList,new1])
            setFormData({
         name:"",assignby:"",assignto:"",date:''
            })
            console.log("task",taskList)
        }
    }
    const handleDelete = (id)=>{
        const data = taskList.filter((item)=>item.id!=id);
        console.log("data",data)
        setTaskList(data)
    }
    const [active,setActive]=useState(0)
    return (
    <div>
        <input type="text" name="name" placeholder='task name' onChange={handleChange} value={name} />
        <input type="text" name="assignby" placeholder='Assign to' onChange={handleChange} value={assignby} />
        <input type="text" name="assignto" placeholder='Assign By' onChange={handleChange} value={assignto}/>
        <input type="date" name="date" placeholder='date ' onChange={handleChange} value={date} />
        <button onClick={handleAdd}>ADD</button>


        <table>
        {taskList.map((item)=>
        <tr>
        <td>{item.name}</td>
        <td>{item.assignby}</td>
        <td>{item.date}</td>
        <td>{item.assignto}</td>
        <button onClick={()=>{handleDelete(item.id)}}>DELETE</button>
        </tr>
        )}
        
        </table>

        <div >
        <button onClick={()=>setActive(0)}>Tab1</button>
        <button onClick={()=>setActive(1)}>Tab2</button>
        <button onClick={()=>setActive(2)}>Tab3</button>
        <div >
        {active==0?  <div>Tbale contrnt 1</div>:active==1?  <div>Tbale contrnt2</div>: <div>Tbale contrnt 3</div>}
        </div>

        </div>
      
      
       
    </div>
    )
}

export default Task;
