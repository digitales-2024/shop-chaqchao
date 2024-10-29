import { useSchedulesQuery } from "@/redux/services/classApi";
import { useState, useEffect } from "react";

interface Schedule {
  id: string;
  startTime: string;
}

export const useSchedules = () => {
  const { data: schedules, isLoading, error } = useSchedulesQuery();
  const [scheduleOptions, setScheduleOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (schedules && !isLoading) {
      setScheduleOptions(
        schedules.map((schedule: Schedule) => ({
          value: schedule.id,
          label: schedule.startTime,
        })),
      );
    }
  }, [schedules, isLoading]);

  return { scheduleOptions, isLoading, error };
};
