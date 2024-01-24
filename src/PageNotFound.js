
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
export function PageNotFound(){
    const navigate = useNavigate();
   setTimeout(()=>{
    toast.error('Page not found');
   },500)
    setTimeout(()=>{
        navigate('/');
    },3000)
    return (
        <>
        </>
    )
}