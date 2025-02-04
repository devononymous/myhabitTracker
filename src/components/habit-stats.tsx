import React, { useEffect } from "react";
import { LinearProgress, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchHabits, Habit } from "../store/habitSlice";

const HabitStats: React.FC = () => {
  const { habits, isLoading } = useSelector(
    (state: RootState) => state.habits
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  if (isLoading) {
    return <LinearProgress />;
  }
  const getCompletedToday = ()=>{
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit)=>habit.completedDates.includes(today)).length;
  }

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();
    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const getLongestStreak = () => {
    return Math.max(...habits.map(getStreak), 0);
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Habit Statistics
      </Typography>
      <Typography variant="body2" gutterBottom>
        Total Habits {habits.length}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Completed Today: {getCompletedToday()}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Longest Streak:{getLongestStreak()}
      </Typography>
    </Paper>
  );
};

export default HabitStats;
