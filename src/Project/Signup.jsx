import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { axiosInstance } from '../../axiosInstance'

const signupValid = Yup.object({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Please enter name"),
  email: Yup.string().email("Please enter valid email").required("Please enter email"),
  password: Yup.string().min(5, "Password must be at least 5 characters").required("Please enter password"),
  cpassword: Yup.string().oneOf([Yup.ref("password")], "Password does not match").required("Please confirm password"),
})

const initialValues = {
  name: '',
  email: '',
  password: '',
  cpassword: '',
  cart:[],
  orders:[],
  active:true,
}

function Signup() {
   const navigate=useNavigate()


  return (
    <div 
      className="bg-cover bg-no-repeat h-screen w-full flex justify-center items-center mr-[-100px] "
      style={{
        
        backgroundImage: 'url("https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5pa2UlMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D")',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={signupValid}
        onSubmit={(values) => {
          axiosInstance.post("/auth/register", values)
            .then((res) => {
              toast.success("Registration successful");
              navigate("/signin");
            })
            .catch((err) => {
              if (err.response && err.response.data.message) {
                toast.error(err.response.data.message); 
              } else {
                toast.error("Error registering user");
              }
              console.log(err);
            });
          console.log(values);
        }}
        
      >
        {({ errors}) => (
          <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold text-center mb-6">REGISTER</h2>
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold">Name</label>
                <Field 
                  type="text" 
                  name="name" 
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                {errors.name && <small className="text-red-500">{errors.name}</small>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                <Field 
                  type="email" 
                  name="email" 
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                {errors.email && <small className="text-red-500">{errors.email}</small>}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                <Field 
                  type="password" 
                  name="password" 
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                { errors.password && <small className="text-red-500">{errors.password}</small>}
              </div>

              <div className="mb-4">
                <label htmlFor="cpassword" className="block text-sm font-semibold">Confirm Password</label>
                <Field 
                  type="password" 
                  name="cpassword" 
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                {errors.cpassword && <small className="text-red-500">{errors.cpassword}</small>}
              </div>
             

              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Submit
              </button>
              <a  className='text-amber-900' href='/Signin'>Login here</a>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default Signup;
