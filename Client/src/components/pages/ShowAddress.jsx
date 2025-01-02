import { useSelector } from "react-redux";
import DisplayAddress from "./DisplayAddress";

const ShowAddress = () => {
  const addressList = useSelector((state) => state.address.addressList);
  console.log(addressList);

  return (
   <>
   
   {addressList.map((address , index) => {
    return <DisplayAddress addressData = {address} key = {index || address._id} />
   })}
   
   </>
  );
};

export default ShowAddress;
