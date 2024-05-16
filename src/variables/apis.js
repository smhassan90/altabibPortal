export const getAllBasicData = {
  status: "200",
  data: {
    doctors: [
      {
        id: 1,
        name: "Dr. Furqan Ahmed",
        address: "Shahrae Faisal",
        gender: "male",
        age: 41,
        priority: 1,
        username: "furqan.ahmed",
        type: 1,
        doctorClinicDALS: [
          {
            id: 2,
            clinic: {
              id: 2,
              name: "Patel Hospital",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
          {
            id: 1,
            clinic: {
              id: 1,
              name: "Dental Vision 2000",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
          {
            id: 3,
            clinic: {
              id: 3,
              name: "T.O Clinic",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
        ],
        qualifications: [
          {
            id: 2,
            name: "BDS",
          },
          {
            id: 3,
            name: "RDS",
          },
        ],
        specializations: [],
      },
      {
        id: 2,
        name: "Syed Faheem Ahmed",
        address: "Gulshan-e-Iqbal Block 13D",
        gender: "male",
        age: 45,
        priority: 1,
        username: "s.faheem",
        type: 3,
        doctorClinicDALS: [
          {
            id: 4,
            clinic: {
              id: 2,
              name: "Patel Hospital",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
          {
            id: 5,
            clinic: {
              id: 5,
              name: "Diabetes & Foot Care",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
          {
            id: 10,
            clinic: {
              id: 1,
              name: "Dental Vision 2000",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
          {
            id: 6,
            clinic: {
              id: 6,
              name: "Ahmed Clinic",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
        ],
        qualifications: [
          {
            id: 1,
            name: "MBBS",
          },
          {
            id: 2,
            name: "BDS",
          },
          {
            id: 3,
            name: "RDS",
          },
        ],
        specializations: [
          {
            id: 1,
            name: "Dentist",
          },
        ],
      },
      {
        id: 3,
        name: "Jane Doe",
        address: "123 Main Street",
        gender: "female",
        age: 35,
        priority: 1,
        username: "johndoe",
        type: 1,
        doctorClinicDALS: [
          {
            id: 7,
            clinic: {
              id: 1,
              name: "Dental Vision 2000",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
          {
            id: 8,
            clinic: {
              id: 6,
              name: "Ahmed Clinic",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
        ],
        qualifications: [
          {
            id: 5,
            name: "MCPS",
          },
          {
            id: 2,
            name: "BDS",
          },
          {
            id: 1,
            name: "MBBS",
          },
        ],
        specializations: [],
      },
      {
        id: 4,
        name: "Jane Smith",
        address: "456 Elm Street",
        gender: "female",
        age: 42,
        priority: 1,
        username: "janesmith",
        type: 1,
        doctorClinicDALS: [
          {
            id: 12,
            clinic: {
              id: 5,
              name: "Diabetes & Foot Care",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
          {
            id: 11,
            clinic: {
              id: 4,
              name: "Family Care Clinic",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
        ],
        qualifications: [
          {
            id: 4,
            name: "FCPS",
          },
          {
            id: 1,
            name: "MBBS",
          },
          {
            id: 2,
            name: "BDS",
          },
        ],
        specializations: [],
      },
      {
        id: 5,
        name: "Michelle Johnson",
        address: "789 Oak Avenue",
        gender: "female",
        age: 50,
        priority: 1,
        username: "michaeljohnson",
        type: 1,
        doctorClinicDALS: [
          {
            id: 9,
            clinic: {
              id: 3,
              name: "T.O Clinic",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
        ],
        qualifications: [
          {
            id: 4,
            name: "FCPS",
          },
          {
            id: 1,
            name: "MBBS",
          },
          {
            id: 6,
            name: "MS",
          },
          {
            id: 2,
            name: "BDS",
          },
        ],
        specializations: [],
      },
      {
        id: 6,
        name: "Emily Davis",
        address: "101 Pine Road",
        gender: "female",
        age: 28,
        priority: 1,
        username: "emilydavis",
        type: 1,
        doctorClinicDALS: [
          {
            id: 13,
            clinic: {
              id: 6,
              name: "Ahmed Clinic",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
          {
            id: 14,
            clinic: {
              id: 5,
              name: "Diabetes & Foot Care",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
        ],
        qualifications: [
          {
            id: 1,
            name: "MBBS",
          },
        ],
        specializations: [],
      },
      {
        id: 7,
        name: "Christopher Wilson",
        address: "202 Cedar Lane",
        gender: "male",
        age: 45,
        priority: 1,
        username: "christopherwilson",
        type: 1,
        doctorClinicDALS: [
          {
            id: 16,
            clinic: {
              id: 1,
              name: "Dental Vision 2000",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
          {
            id: 15,
            clinic: {
              id: 4,
              name: "Family Care Clinic",
            },
            charges: 1000,
            startTime: "17:00",
            endTime: "22:00",
          },
        ],
        qualifications: [
          {
            id: 1,
            name: "MBBS",
          },
        ],
        specializations: [],
      },
    ],
  },
};
