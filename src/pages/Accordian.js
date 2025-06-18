import React, { useEffect, useState } from 'react'

function Accordian() {
    let data = [
        {"title":"minal","content":"hello my name is minal jain and i am software engineer"},
        {"title":"kavita","content":"hello my name is kavita jain and i am software engineer"}
    ]
    const [show,setShow]=useState([]);
function toggle(index){
    
    
    setShow(prev =>{
        let exist = prev.find((item)=>item.index==index)
        if(exist){
            return prev.map((item)=>item.index==index?{...item,shows:!item?.shows}:item)
        }else{
            return [
                ...prev,
                {index:index,shows:true}
            ]
        }
    });
    }

console.log("show",show)
  return (
    <div>
    {data.map((item,index)=>
        <div>
      <div class="name" onClick={()=>{toggle(index)}}>{item.title}</div>
      <div style={{display:show[index]?.index==index&&show[index]?.shows==true?"block":"none"}}>{item.content}</div>
      </div>
    )
   }
    </div>
  )
}

export default Accordian
