import React from 'react'
import '../product-managerPage/product-managerProfile.js';

const CommentApprove = () => {

    const unappCommennts=[{product_id: 123, initCommit: "Güzel Ürün"}];
    return (
        <div className='approval-holder'>
  
        <div className='Row'>
    
          <div className='approval-container'>
            <div>
    
              {unappCommennts.length === 0 
              ? <h1 style={{padding: "50px",textAlign:'center'}}>You have no comment waiting approval.</h1>
              :
              unappCommennts.map((item)=>{
                    return (
                    
                      <div className="approval-column"style={{padding: '10px', margin:'20px'}}>
                        <h style={{marginLeft: '25px', fontWeight:'bold', marginRight:'20px'}}>Order ID:{item.product_id}</h>
                        <h style={{marginLeft: '50px',marginRight:-20, fontWeight:'bold'}}>Order Date:{item.initCommit} </h>
                        <input type = "submit" value = "Approve"  style={{backgroundColor: 'lightgreen', marginLeft: '300px',width:"100px",borderRadius:'5px'}}/>
                        <input type = "submit" value = "Disapprove"  style={{backgroundColor: 'red',marginLeft: '50px', width:"100px",borderRadius:'5px'}}/>
                      </div>
                  );})}
    
            </div>
          </div>
        </div>
        </div>
      )
}

export default CommentApprove
