
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const signinvalid = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  password: Yup.string()
    .min(5, "Please enter at least 5 characters")
    .required("Please enter password"),
});

const initialValues = {
  email: '',
  password: ''
};

function SignIn() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleClick = (values) => {
    const user = users.find(user => user.email === values.email && user.password === values.password);
    if (!user) {
      toast.error("Invalid email or password");
      return;
    }
    if (!user.active) {
      toast.error("User is blocked. Please contact support.");
      return;
    }
    localStorage.setItem('userId', user.id);
    navigate(user.id === "6175" ? "/overview" : "/");
    toast.success("Login successful");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">LOGIN</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={signinvalid}
          onSubmit={handleClick}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
            
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">EMAIL</label>
                <Field
                  type="email"
                  name="email"
                  className={`mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300 ${
                    errors.email && touched.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                )}
              </div>

             
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">PASSWORD</label>
                <Field
                  type="password"
                  name="password"
                  className={`mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300 ${
                    errors.password && touched.password ? 'border-red-500' : ''
                  }`}
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                )}
              </div>

              <div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                  Submit
                </button>
                <a href='/Signup' className="block text-center text-blue-600 mt-2">Create Account</a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignIn;
