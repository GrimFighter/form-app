import React, { useState } from 'react';

import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
import HttpsIcon from '@mui/icons-material/Https';

import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ClassNames } from '@emotion/react';
import './form.css';

function Form ()
{
  const [ formData, setFormData ] = useState( {
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    zipCode: '',
    dob: '',
    address: '',
    country: '',
    aadhar: '',
    pan: ''
  } );
  const [ passwordVisible, setPasswordVisible ] = useState( false );
  const handlePasswordToggle = () =>
  {
    setPasswordVisible( !passwordVisible );
  };

  const [ errors, setErrors ] = useState( {} );

  const handleChange = ( e ) =>
  {
    const { name, value } = e.target;
    setFormData( {
      ...formData,
      [ name ]: value
    } );
  };

  const handlePhoneChange = ( value ) =>
  {
    setFormData( {
      ...formData,
      phone: value
    } );
  };

  const validate = () =>
  {
    let errors = {};

    if ( !formData.name )
    {
      errors.name = 'Name is required';
    }

    if ( !formData.username )
    {
      errors.username = 'Username is required';
    }

    if ( !formData.email )
    {
      errors.email = 'Email is required';
    } else if ( !/\S+@\S+\.\S+/.test( formData.email ) )
    {
      errors.email = 'Email address is invalid';
    }

    if ( !formData.password )
    {
      errors.password = 'Password is required';
    } else if ( !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test( formData.password ) )
    {
      errors.password = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    // if ( !formData.phone )
    // {
    //   errors.phone = 'Phone number is required';
    // } else if ( !/^\d{10}$/.test( formData.phone ) )
    // {
    //   errors.phone = 'Phone number must be 10 digits';
    // }

    if ( !formData.zipCode )
    {
      errors.zipCode = 'ZIP Code is required';
    } else if ( !/^\d{6}$/.test( formData.zipCode ) )
    {
      errors.zipCode = 'ZIP Code must be 6 digits';
    }

    if ( !formData.dob )
    {
      errors.dob = 'Date of Birth is required';
    }

    if ( !formData.address )
    {
      errors.address = 'Address is required';
    }
    if ( !formData.country )
    {
      errors.address = 'Country is required';
    }

    if ( !formData.aadhar )
    {
      errors.aadhar = 'Aadhar is required';
    } else if ( !/^\d{4}\s\d{4}\s\d{4}$/.test( formData.aadhar ) )
    {
      errors.aadhar = 'Aadhar should be in the format 1234 1234 1234';
    }

    if ( !formData.pan )
    {
      errors.pan = 'PAN is required';
    } else if ( !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test( formData.pan ) )
    {
      errors.pan = 'PAN should be in the format ABCDE1234F';
    }

    return errors;
  };

  const handleSubmit = ( e ) =>
  {
    e.preventDefault();
    const validationErrors = validate();
    setErrors( validationErrors );

    if ( Object.keys( validationErrors ).length === 0 )
    {
      alert( JSON.stringify( formData, null, 2 ) );
      // Handle form submission (e.g., send data to server)
    }
  };

  return (
    <div className="Form">
      <form onSubmit={ handleSubmit } className='Form'>
        <div className="input">
          <label className='labels' htmlFor="name">Full Name</label>
          <input
            className="input-boxes"
            type="text"
            name="name"
            placeholder='John Doe'
            id='name'
            pattern="^[a-zA-Z\s]+$"
            title="Full Name should only contain letters and spaces."
            value={ formData.name }
            onChange={ handleChange }
            required
          />
        </div>

        <div className="input">
          <label className='labels' htmlFor="username">Username</label>
          <input
            className="input-boxes"
            type="text"
            name="username"
            placeholder='GrimFighter'
            id='username'
            pattern="^[a-zA-Z0-9_]+$"
            title="Username should only contain letters, numbers, and underscores."
            value={ formData.username }
            onChange={ handleChange }
            required
          />
        </div>

        <div className="input">
          <label className='labels' htmlFor="email">Email</label>
          <input
            className="input-boxes"
            type="email"
            name="email"
            placeholder='john@doe.com'
            id='email'
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Email should be in the format john@doe.com."
            value={ formData.email }
            onChange={ handleChange }
            required
          />
        </div>

        <div className="input">
          <label className='labels' htmlFor="password">Password</label>
          <div className="password-toggle">
            <input
              className="input-boxes"
              type={ passwordVisible ? "text" : "password" }
              name="password"
              placeholder=''
              id='password'
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
              value={ formData.password }
              onChange={ handleChange }

            />
            <button type="button" onClick={ handlePasswordToggle } className="password-toggle-button">
              { passwordVisible ? <HttpsIcon /> : <NoEncryptionIcon /> }
            </button>
          </div>
        </div>
        <div className="input">
          <label className='labels' htmlFor="ph-no">Phone Number</label>

          <ReactPhoneInput
            country={ 'in' }
            value={ formData.phone }
            onChange={ handlePhoneChange }
          inputProps={ {
            name: 'phone',
            required: true,
            autoFocus: false,

          } }
          />
        </div>

        <div className="input">
          <label className='labels' htmlFor="zip-code">Postal Code</label>
          <input
            className="input-boxes"
            type="text"
            name="zipCode"
            placeholder='700001'
            id='zip-code'
            pattern="^\d{6}$"
            title="Postal Code should be 6 digits."
            value={ formData.zipCode }
            onChange={ handleChange }
            required
          />
        </div>

        <div className="input">
          <label className='labels' htmlFor="dob">Date of Birth</label>
          <input
            className="input-boxes"
            type="date"
            name="dob"
            id='dob'
            value={ formData.dob }
            onChange={ handleChange }
            required
          />
        </div>

        <div className="input">
          <label className='labels' htmlFor="address">City</label>
          <input
            className="input-boxes"
            type="text"
            name="address"
            placeholder='Kolkata'
            id='address'
            pattern="^[a-zA-Z\s-]+$"
            title="City name can contain letters, spaces, and hyphens."
            value={ formData.address }
            onChange={ handleChange }
            required
          />
        </div>
        <div className="input">
          <label className='labels' htmlFor="country">Country</label>
          <input
            className="input-boxes"
            type="text"
            name="country"
            placeholder='India'
            id='address'
            pattern="^[a-zA-Z\s-]+$"
            title="Country name can contain letters, spaces, and hyphens."
            value={ formData.country }
            onChange={ handleChange }
            required
          />
        </div>

        <div className="input">
          <label className='labels' htmlFor="aadhar">Aadhar</label>
          <input
            className="input-boxes"
            type="password"
            name="aadhar"
            placeholder='1234 1234 1234'
            id='aadhar'
            pattern="^\d{4}\s\d{4}\s\d{4}$"
            title="Aadhar should be in the format 1234 1234 1234."
            value={ formData.aadhar }
            onChange={ handleChange }
            required
          />
        </div>

        <div className="input">
          <label className='labels' htmlFor="pan">PAN</label>
          <input
            className="input-boxes"
            type="sensitive"
            name="pan"
            placeholder='ABCDE1234F'
            id='pan'
            pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
            title="PAN should be in the format ABCDE1234F."
            value={ formData.pan }
            onChange={ handleChange }
            required
          />
        </div>

        <button id='button' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
