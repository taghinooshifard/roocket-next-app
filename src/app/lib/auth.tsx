import axios from "axios";

export default async function Auth(token:string){
       
    //check for validation
    try{
        
        let response = await axios.get('https://react-camp-api.roocket.ir/api/admin/dashboard',{
            headers: {
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${token}`
            }
        })
         if(response.status == 200)
            return true;
        else
            return false;
    }
    catch(error){
        return false
    }
    
}