// @ts-nocheck
import React, { useEffect, useState } from 'react';

import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
import HttpsIcon from '@mui/icons-material/Https';

import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
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
    city: '',
    aadhar: '',
    pan: ''
  } );
  const [ passwordVisible, setPasswordVisible ] = useState( false );
  const [ errors, setErrors ] = useState( {} );
  const [ submitted, setSubmitted ] = useState( false );

  const handlePasswordToggle = () =>
  {
    setPasswordVisible( !passwordVisible );
  };

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

  const [ countryList, setCountryList ] = useState( [] );
  const [ cityList, setCityList ] = useState( [] );

  useEffect( () =>
  {
    fetch( 'https://countriesnow.space/api/v0.1/countries/capital' )
      .then( ( res ) => res.json() )
      .then( ( data ) =>
      {
        setCountryList( data.data );
      } );
  }, [] );

  const handleCountryChange = ( e ) =>
  {
    const selectedCountry = e.target.value;
    setFormData( {
      ...formData,
      country: selectedCountry,
      city: '' // Reset city when country changes
    } );

    // Fetch cities for the selected country
    fetch( "https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      body: JSON.stringify( { country: selectedCountry } ),
      headers: {
        "Content-Type": "application/json",
      }
    } ).then( ( res ) => res.json() )
      .then( ( data ) =>
      {
        setCityList( data.data );
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
      errors.country = 'Country is required';
    }

    if ( !formData.city )
    {
      errors.city = 'City is required';
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
      setSubmitted( true );
    }
  };

  return (
    <div className="Form">
      { submitted ? (
        <div className="form-submitted">
          <h2>Form Submitted</h2>
          <table className='table-class'>
            
            <tbody>
            
              <tr>
                <td><strong>Full Name:</strong></td>
                <td>{ formData.name }</td>
              </tr>
              <tr>
                <td><strong>Username:</strong></td>
                <td>{ formData.username }</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{ formData.email }</td>
              </tr>
              <tr>
                <td><strong>Phone Number:</strong></td>
                <td>{ formData.phone }</td>
              </tr>
              <tr>
                <td><strong>Postal Code:</strong></td>
                <td>{ formData.zipCode }</td>
              </tr>
              <tr>
                <td><strong>Date of Birth:</strong></td>
                <td>{ formData.dob }</td>
              </tr>
              <tr>
                <td><strong>Country:</strong></td>
                <td>{ formData.country }</td>
              </tr>
              <tr>
                <td><strong>City:</strong></td>
                <td>{ formData.city }</td>
              </tr>
              <tr>
                <td><strong>Address:</strong></td>
                <td>{ formData.address }</td>
              </tr>
              <tr>
                <td><strong>Aadhar:</strong></td>
                <td>{ formData.aadhar }</td>
              </tr>
              <tr>
                <td><strong>PAN:</strong></td>
                <td>{ formData.pan }</td>
              </tr>
            </tbody>
            
          </table>
          <button className='button' id='edit-button' onClick={ () => setSubmitted( false ) }>Edit</button>

        </div>
      ) : (
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
            {/* {errors.name && <div className="error">{errors.name}</div>} */ }
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
            { errors.username && <div className="error">{ errors.username }</div> }
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
            { errors.email && <div className="error">{ errors.email }</div> }
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
                required
              />
              <button type="button" onClick={ handlePasswordToggle } className="password-toggle-button">
                { passwordVisible ? <HttpsIcon /> : <NoEncryptionIcon /> }
              </button>
            </div>
            { errors.password && <div className="error">{ errors.password }</div> }
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
            { errors.phone && <div className="error">{ errors.phone }</div> }
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
            { errors.zipCode && <div className="error">{ errors.zipCode }</div> }
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
            { errors.dob && <div className="error">{ errors.dob }</div> }
          </div>

          <div className="input">
            <label className='labels' htmlFor="country">Country</label>
            <select
              name="country"
              className='input-boxes'
              value={ formData.country }
              onChange={ handleCountryChange }
              required
            >
              <option value="">Select a country</option>
              { countryList.map( ( e, i ) => (
                <option key={ i } value={ e.name }>{ e.name }</option>
              ) ) }
            </select>
            { errors.country && <div className="error">{ errors.country }</div> }
          </div>

          <div className="input">
            <label className='labels' htmlFor="city">City</label>
            <select
              name="city"
              className='input-boxes'
              value={ formData.city }
              onChange={ handleChange }
              required
            >
              <option value="">Select a city</option>
              { cityList.map( ( city, i ) => (
                <option key={ i } value={ city }>{ city }</option>
              ) ) }
            </select>
            { errors.city && <div className="error">{ errors.city }</div> }
          </div>

          <div className="input">
            <label className='labels' htmlFor="address">Address</label>
            <input
              className="input-boxes"
              type="text"
              name="address"
              placeholder='123 Main St'
              id='address'
              value={ formData.address }
              onChange={ handleChange }
              required
            />
            { errors.address && <div className="error">{ errors.address }</div> }
          </div>

          <div className="input">
            <label className='labels' htmlFor="aadhar">Aadhar</label>
            <input
              className="input-boxes"
              type="text"
              name="aadhar"
              placeholder='1234 1234 1234'
              id='aadhar'
              pattern="^\d{4}\s\d{4}\s\d{4}$"
              title="Aadhar should be in the format 1234 1234 1234."
              value={ formData.aadhar }
              onChange={ handleChange }
              required
            />
            { errors.aadhar && <div className="error">{ errors.aadhar }</div> }
          </div>

          <div className="input">
            <label className='labels' htmlFor="pan">PAN</label>
            <input
              className="input-boxes"
              type="text"
              name="pan"
              placeholder='ABCDE1234F'
              id='pan'
              pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
              title="PAN should be in the format ABCDE1234F."
              value={ formData.pan }
              onChange={ handleChange }
              required
            />
            { errors.pan && <div className="error">{ errors.pan }</div> }
          </div>

          <button className='button' id='button' type="submit">Submit</button>
        </form>
      ) }
    </div>
  );
}

export default Form;
