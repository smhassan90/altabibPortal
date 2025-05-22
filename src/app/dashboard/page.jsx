'use client'
import React from 'react';
// import StatCard from './components/StatCard';
import { Building2, User2, ShoppingCart,Heart,Clock } from 'lucide-react'; // Example icons
import StatCard from '@/components/cards/StatCard';


const page = () => {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5  max-w-7xl mx-auto p-6">
      <StatCard
        icon={<Building2 className="h-8 w-8 text-[#FF6471]" />}
        title="TOTAL CLINICS"
        value="12"
        change="20"
       bgColor="bg-[#FF6471]" // pinkish-red

      />
      <StatCard
        icon={<User2 className="h-8 w-8 text-[#FD784C]" />}
        title="TOTAL PATIENTS"
        value="134"
        change="54"
        bgColor='bg-[#FD784C]'
      />
      <StatCard
        icon={<ShoppingCart className="h-8 w-8 text-[#FFD641]" />}
        title="NEW ORDERS"
        value="29"
        change="18"
         bgColor='bg-[#FFD641]'
      />
      <StatCard
        icon={<Heart className="h-8 w-8 text-[#71D099]" />}
        title="FAVORITES"
        value="78"
        change="12"
         bgColor='bg-[#71D099]'
      />
      <StatCard
        icon={<Heart className="h-8 w-8 text-[#2886FF]" />}
        title="FAVORITES"
        value="78"
        change="12"
         bgColor='bg-[#2886FF]'
      />

    </div>
    <div className='ml-8'>
      <h1 className='font-semibold text-large'>My Clinics</h1>
  
  
     <div className="w-[400px] bg-white rounded-lg shadow-md p-4 mb-4 gap-2 space-x-3 ">
      {/* Clinic Name Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Building2 className="h-5 w-5 text-blue-500 mr-2" />
          <span className="font-semibold text-sm">Clinic:</span>
        </div>
        <span className="text-sm font-medium">Diabates & Foot Care</span>
      </div>

      {/* Timing Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-green-500 mr-2" />
          <span className="font-semibold text-sm">Time:</span>
        </div>
        <span className="text-sm font-medium">08:00 AM-01:00 PM</span>

        

      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-green-500 mr-2" />
          <span className="font-semibold text-sm">Charges:</span>
        </div>
        <span className="text-sm font-medium">3,000/-</span>
      </div>

      
    </div>
    </div>
    </>
    
  )
}

export default page