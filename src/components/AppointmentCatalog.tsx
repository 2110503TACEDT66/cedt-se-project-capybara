'use client'
import { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import getUserDashboard from "@/app/libs/getUserDashboard";
import getAppointments from "@/app/libs/getAppointments";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";

export default function AppointmentCatalog({
  appointmentJson,
  session
}: {
  appointmentJson: AppointmentJson,
  session: Session
}) {
  const [appointmentJsonReady, setAppointmentJsonReady] = useState<AppointmentJson>();
  
  useEffect(() => {
    const setData = async () => {
      const profile = await getUserDashboard(session.user.token);
      const appointment = await getAppointments(session.user.token);
      setAppointmentJsonReady(appointment)
    }
    setData();
  
  }, [session.user.token])

  return (
    <div className="block place-items-start justify-start mx-10">
      {appointmentJsonReady && appointmentJsonReady.data.map((appointmentItem: AppointmentItem) => (
        <AppointmentCard
          key={appointmentItem._id}
          aid={appointmentItem._id}
          userId={appointmentItem.user}
          campground={appointmentItem.campground}
          appointmentDate={new Date(appointmentItem.apptDate)}
        />
      ))}
    </div>
  );
}
