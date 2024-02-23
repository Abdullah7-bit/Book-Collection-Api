import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    let update;

    // Event handler for input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (username == 'username') {
            setUsername(value);
        } else if (name == 'email') {
            setEmail(value);
        } else if (firstName == 'firstName') {
            setFirstName(value);
        } else if (lastName == 'lastName') {
            setLastName(value);
        } else if (name == 'password') {
            setPassword(value);
        }
    };

    // Event handler for button click
    const handleButtonClick = async () => {

        await sendSignUpDatatoAPI();

        // Redirect to the allbook route          
        setTimeout(() => {
            navigate("/");
        }, 1000);
    };
    const sendSignUpDatatoAPI = async () => {
        try {
            const response = await fetch('api/Account/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password

                }),
            });

            if (response.ok) {

                const data = await response.json(); // Convert response to JSON

                // Store the JWT token in localStorage will used to implement Session on frontend
                localStorage.setItem('key', data.message);

                // Reset the input fields to Empty
                setUsername('');
                setEmail('');
                setFirstName('');
                setLastName('');
                setPassword('');

            } else {
                console.error('Failed to send data to the API.', response.statusText);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        /* 
            Input Form for Sigin
        */
        <>
            <h1>Sign Up</h1>
            <div>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <th scope="row">Username : </th>
                            <td>
                                <input type="text" name="username" value={username} onChange={handleInputChange} />
                            </td>

                        </tr>
                        <tr>
                            <th scope="row">Email : </th>
                            <td>
                                <input type="email" name="email" value={email} onChange={handleInputChange} />
                            </td>

                        </tr>
                        <tr>
                            <th scope="row">First Name : </th>
                            <td>
                                <input type="" name="firstName" value={firstName} onChange={handleInputChange} />
                            </td>

                        </tr>
                        <tr>
                            <th scope="row">Last Name : </th>
                            <td>
                                <input type="text" name="lastName" value={lastName} onChange={handleInputChange} />
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

export default SignUp;