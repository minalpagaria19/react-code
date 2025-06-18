import React from 'react'

export default function HighOrder(WrappedCompoennt) {
  return function Enhance(props){
        return (
            <div>
            <p>HEllo from HOC</p>
           <WrappedCompoennt {...props} />
            </div>
        )
  }
}
