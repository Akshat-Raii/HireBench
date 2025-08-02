import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

const Dashboard = () => {
  return (
    <div className='p-6 md:p-10'>
        {/* Header */}
        <div className='mb-8'>
            <h2 className='font-bold text-3xl'>Dashboard</h2>
            <p className='text-gray-500'>Create and Start your AI Interview</p>
        </div>

        {/* Add New Interview Card */}
        <div className='mb-12'> {/* Increased spacing */}
            <AddNewInterview/>
        </div>

        {/* Previous Interview List */}
        <div>
            <InterviewList/>
        </div>
    </div>
  )
}

export default Dashboard;