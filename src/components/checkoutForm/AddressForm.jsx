import React, {useState, useEffect} from 'react';
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';
import {Link} from 'react-router-dom';
import FormInput from './CustomTextField';
import {commerce} from '../../lib/commerce';

const AddressForm = ({checkoutToken, next}) =>{
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
    const [shippingSubDivision, setShippingSubDivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const contries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label:name}));
    const subDivitions = Object.entries(shippingSubDivisions).map(([code, name]) => ({id: code, label:name}));
    const options = shippingOptions.map((sO) => ({id : sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })) 


    const  fetchShippingCountries = async(checkoutTokenId) => {
        const { contries } = await commerce.localeListShippingCountries(checkoutTokenId);
        
        setShippingCountries(contries);
        setShippingCountry(Object.keys(contries)[0]);

    }

    const fetchSubdiviitions = async(countryCode) =>{
        const {subDivitions  } = await commerce.services.localeListShippingCountries(countryCode);
        
        setShippingSubDivisions(subDivitions);
        setShippingSubDivision(Object.keys(subDivitions)[0]);
    }

    const fetchShippingOptions = async(checkoutTokenId, country, region = null) =>{
        const options  = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
        
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    useEffect(() =>{
        fetchShippingCountries(checkoutToken.id)
    }, []);

    useEffect(() =>{
        if(shippingSubDivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubDivision);
      
    }, [shippingSubDivision]);

    useEffect(() =>{
        if(shippingCountry) fetchSubdiviitions(shippingCountry)
    },[shippingCountry]);


    const methods = useForm();
    return (
        <>
        <Typography variant="h6" gutterBottom></Typography>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubDivision, shippingOption }) )}>
                <Grid container spacing={3}>
                    <FormInput name='firstName' label='First Name' />
                    <FormInput name='lastName' label='Last Name' />
                    <FormInput name='address1' label='Address' />
                    <FormInput name='email' label='Email' />
                    <FormInput name='city' label='City' />
                    <FormInput name='zip' label='Zip' /> 
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                            {contries.map((country) =>(
                                 <MenuItem key={country.id} value={country.id}>
                                     {country.label}
                                 </MenuItem> 
                            ))}
                            </Select>
                        </Grid>  
                    </Grid>
                    <Grid item xs={12} sm={6}>   
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={shippingSubDivision} fullWidth onChange={(e) => setShippingSubDivision(e.target.value)}>
                            {subDivitions.map((subdivision) =>(
                                 <MenuItem key={subdivision.id} value={subdivision.id}>
                                     {subdivision.label}
                                 </MenuItem> 
                            ))}
                            </Select>
                        </Grid>
                        
                         <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            {options.map((option) =>(
                                 <MenuItem key={option.id} value={option.id}>
                                     {option.label}
                                 </MenuItem> 
                            ))}
                            </Select>
                        </Grid>
                        <br/>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                            <Button type="submit" variant="contained" color="primary">Next</Button>


                        </div>  
                        
                
            </form>

        </FormProvider>
    </>
    );
}

export default AddressForm;