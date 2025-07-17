import './rating.css'
export default function Rating({rating}) {



const ratePercentage= (rating/5)*100  ;


  return (
<>
<div className="star-wrapper ">
    <div className="stars-outer">
        <div className="stars-inner" style={ {width: `${ratePercentage}%`} }>
            
        </div>
        
    </div>
    <p className='text-base ms-1'> {rating}</p>
</div>

</>
)
}
