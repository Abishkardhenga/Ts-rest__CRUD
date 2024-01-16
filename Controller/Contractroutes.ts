import { initServer } from "@ts-rest/express";
import { contract } from "../Contracts/Contract";
import { data } from "../data";

const s = initServer();
console.log("check the data type",typeof data )

const Contractroutes = s.router(contract, {
    getProduct: async() => {
        return  { 
          status:200, 
          body:data
        };
      },
      
//   
});

export default Contractroutes;
