import noDataImage from "../../assets/NodataImage.jpg";
const NoData = () => {
  return (
    <>
      <div className="flex justify-center items-center py-5">
        <img src={noDataImage} alt="no-data-image" className="w-full" />
      </div>
    </>
  );
};

export default NoData;
