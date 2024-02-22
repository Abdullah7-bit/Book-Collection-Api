import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    let update;

    // Event handler for input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name == 'email') {
            setEmail(value);
        } else if (name == 'password') {
            setPassword(value);
        }
    };

    // Event handler for button click
    const handleButtonClick = async () => {

        await sendSignInDatatoAPI();

        // Redirect to the allbook route          
        setTimeout(() => {
            navigate("/");
        }, 1000);
    };
    const sendSignInDatatoAPI = async () => {
        try {
            const response = await fetch('api/Account/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({

                    email: email,
                    password: password,

                }),
            });

            if (response.ok) {

                const data = response.json(); // Convert response to JSON
                setToken(data.message); // Set the token from response data

                // Reset the input fields to Empty
                setEmail('');
                setPassword('');

            } else {
                console.error('Failed to send data to the API.');
            }


        } catch (error) {
            console.error('Error:', error);
        }
    };


    // Store the JWT token in localStorage will used to implement Session on frontend
    sessionStorage.setItem('key', token);
    return (
        /* 
            Input Form for Sigin
        */
       <>
         <h1>Sign In</h1>
          <div>
              <table className="table table-borderless">
                  <tbody>
                      <tr>
                          <th scope="row">Email : </th>
                            <td>
                                <input type="email" name="email" value={email} onChange={handleInputChange} />
                            </td>

                      </tr>
                      <tr>
                          <th scope="row">Password : </th>
                            <td>
                                <input type="password" name="password" value={password} onChange={handleInputChange} />
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <button id="liveToastBtn" onClick={handleButtonClick}>Sign In</button>
                          </td>
                          {update}
                      </tr>
                      
                  </tbody>
              </table>              
          </div>
        </>
    );



    
}

export default SignIn;