import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Bars } from  'react-loader-spinner';
import './Spinner.css'


const Spinner = () =>{
    return(
        <div>
            <Bars className="spinner" color="#ffffff" height={60} width={60} />
        </div>
    );

}

export default Spinner;