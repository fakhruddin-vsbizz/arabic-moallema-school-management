import supabase from "@/supabaseClient";

export const postSessionData = async (
  currTime,
  // moduleName,
  attendanceList,
  batchId,
  teacherId
) => {
  const { data, error } = await supabase
    .from("session")
    .insert({
      starting_time: currTime,
      students_present: { students: attendanceList },
      batch_id: batchId,
      teacher_id: teacherId,
    })
    .select();

  if (error) {
    console.log("Error creating session: ", error);
    return null;
  }
  return data;
};

export const fetchSessionAttendance = async (batch_id, session_id) => {
  const { data, error } = await supabase
    .from("session")
    .select("students_present")
    .match({
      batch_id: batch_id,
      session_id: session_id,
    });
  if (error) {
    console.log("Error fetching batches data: ", error);
    return null;
  }
  return data;
};

export const fetchSessionRecording = async (
  batch_id,
  session_id,
  chapter_id
) => {
  const { data, error } = await supabase
    .from("session")
    .select("recorded_video")
    .match({
      batch_id: batch_id,
      session_id: session_id,
      chapter_id: chapter_id,
    });
  if (error) {
    console.log("Error fetching batches data: ", error);
    return null;
  }
  return data;
};

export const fetchSessionData = async (batch_id) => {
  const { data, error } = await supabase.from("session").select("*").match({
    batch_id: batch_id,
  });
  if (error) {
    console.log("Error fetching batches data: ", error);
    return null;
  }
  return data;
};

export const fetchSessionDataForClass = async (batch_id, sessionId) => {
  const { data, error } = await supabase.from("session").select("*").match({
    batch_id: batch_id,
    session_id: sessionId,
  });
  if (error) {
    console.log("Error fetching batches data: ", error);
    return null;
  }
  return data;
};

export const fetchSessionDataForBatch = async (batch_id) => {
  const { data, error } = await supabase.from("session").select("*").match({
    batch_id: batch_id,
  });
  if (error) {
    console.log("Error fetching batches data: ", error);
    return null;
  }
  return data;
};
