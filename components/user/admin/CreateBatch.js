import BatchEdit from "@/components/Modules/batches/BatchEdit";
import React from "react";

const CreateNewclass = (props) => {
  return (
    <>
      <div className="mt-10 sm:mt-20">
        <div className="">
          <BatchEdit setOpen={props.setOpen} actionBtn="Add New Batch" link="/admin/batch-details" />
        </div>
      </div>
    </>
  );
};

export default CreateNewclass;
