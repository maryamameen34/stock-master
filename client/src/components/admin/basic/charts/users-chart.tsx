import React, { useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';


export default function UsersChart() {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.user);
  const roleCounts: { [key: string]: number } = {};
  users.forEach(user => {
    roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
  });

  const totalUsers = users.length;
  const series = Object.keys(roleCounts).map(role => ({
    id: role,
    value: Math.round((roleCounts[role] / totalUsers) * 100),
    label: role,
  }));

  return (
    <div className="">
      <p className='text-center mb-4 font-medium'>Users Record</p>
      <PieChart
        series={[{ data: series }]} 
        width={400}
        height={200}
        margin={{ top: 20, bottom: 20 , left : 10, right:160 }} 
      />
    </div>
  );
}
