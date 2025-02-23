export default function BasicCard({ icon, color, width, height, title, text, ...props}) {
    return (
        <div className="basicCardWrapper" {...props} style={{ backgroundColor: color, width, height, display: 'flex'}}>
           
           <div className="basicCardContent">
            {icon ? (
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 48 48" fill="none" style={{margin: "1rem",}}>
                    <path d="M24.0033 4L29.2737 9.27038H38.7296V18.7263L44 23.9967L38.7296 29.2737V38.7296H29.2737L24.0033 44L18.7264 38.7296H9.27036V29.2737L4 23.9967L9.27036 18.7263V9.27038H18.7264L24.0033 4Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M24 16C27.9932 16.5 31 20 31 24C31 28 28 31.5 24 31.9549" stroke="white" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ) : null}
            
                <div>
                    <h5>{title}</h5>
                    <p>{text}</p>
                </div>
           </div>
           
        </div>

    )
}