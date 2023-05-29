import supabase from "@/supabaseClient";

export const fetchBatcheIdBasedOnBatchName = async (batchName) => {
  const { data, error } = await supabase
    .from("batches")
    .select("*")
    .match({ batch_name: batchName });
  if (error) {
    console.log("Error fetching batche id: ", error);
    return null;
  }
  return data;
};

export const fetchBatchDataBasedOnBatchId = async (batchId) => {
  const { data, error } = await supabase
    .from("batches")
    .select("*")
    .match({ batch_id: batchId });
  if (error) {
    console.log("Error fetching batche id: ", error);
    return null;
  }
  return data;
};

export const fetchBatchesDataForTeacherBasedOnId = async (teacherId) => {
  const { data, error } = await supabase
    .from("batches")
    .select("*")
    .match({ teacher_id: teacherId });

  if (error) {
    console.log("Error fetching batch_student_relation data: ", error);
    return null;
  }
  return data;
};

export const fetchBatchesForTeacherBasedOnId = async (teacherId) => {
  const { data, error } = await supabase
    .from("batches")
    .select("*")
    .match({ teacher_id: teacherId });

  if (error) {
    console.log("Error fetching batch_student_relation data: ", error);
    return null;
  }
  return data;
};

export const fetchBatchesSchedule = async () => {
  const { data, error } = await supabase
    .from("batches")
    .select("schedule");
  if (error) {
    console.log("Error fetching batches data: ", error);
    return null;
  }
  return data;
};

export const fetchIndividualBatch = async (batchId) => {
  const { data, error } = await supabase
    .from("batches")
    .select("chapter_completed")
    .eq("batch_id", batchId);
  if (error) {
    console.log("Error fetching batches data: ", error);
    return null;
  }
  return data;
};

// export const fetchStudentBatchData = async () => {
//   const { data, error } = await supabase
//     .from("batch_student_relation")
//     .select("*");

//   if (error) {
//     console.log("Error fetching batch_student_relation data: ", error);
//     return null;
//   }
//   return data;
// };

export const postCreateBatch = async (
  enteredBatchName,
  teacherId,
  enteredType,
  obj,
  glink
) => {
  const { data, error } = await supabase
    .from("batches")
    .insert({
      batch_name: enteredBatchName,
      teacher_id: teacherId,
      type: enteredType,
      schedule: obj,
      g_meet: glink,
    })
    .select();

  if (error) {
    console.log("Error creating announcement: ", error);
    return null;
  }
  console.log(error);
  return data;
};

export const fetchEnrolledStudentsInBatch = async (batchId) => {
  const { data, error } = await supabase
    .from("batch_student_relationship")
    .select("student_id")
    .match({ batch_id: batchId });

  if (error) {
    console.log("Error fetching batch_student_relation data: ", error);
    return null;
  }
  return data;
};

// export const fetchIndividualBatchBasedOnName = async (name) => {
//   const { data, error } = await supabase
//     .from("batches")
//     .select("id")
//     .eq("batch_name", name);
//   if (error) {
//     console.log("Error fetching batches data: ", error);
//     return null;
//   }
//   return data;
// };

export const fetchBatchesForTeacherBasedOnBatchId = async (batchId) => {
  const { data, error } = await supabase
    .from("batches")
    .select("*")
    .match({ batch_id: batchId });

  if (error) {
    console.log("Error fetching batches data: ", error);
    return null;
  }
  return data;
};

export const fetchTeacherIdBasedOnBatchId = async (batchId) => {
  const { data, error } = await supabase
    .from("batches")
    .select("teacher_id")
    .match({ batch_id: batchId });

  if (error) {
    console.log("Error fetching batch_student_relation data: ", error);
    return null;
  }
  return data;
};
