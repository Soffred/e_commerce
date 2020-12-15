import React, {useState, useEffect} from 'react';
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';
import FormInput from './CustomTextField';
import {commerce} from '../../lib/commerce';

const AddressForm = ({checkoutToken}) =>{
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
    const [shippingSubDivision, setSubDivisions] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    
    const contries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label:name}));

    function fetchShippingCountries(checkoutTokenId) {
        const { contries } = await commerce.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(contries);
        setShippingCountry(Object.keys(contries)[0]);

    }

    useEffect(() =>{
        fetchShippingCountries(checkoutToken.id)
    }, [cart]);


    const methods = useForm();
    return (
        <>
        <Typography variant="h6" gutterBottom></Typography>
        <FormProvider {...methods}>
            <form onSubmit={''}>
                <Grid container spacing={3}>
                    <FormInput required name='firstName' label='First Name' />
                    <FormInput required name='lastName' label='Last Name' />
                    <FormInput required name='address1' label='Address' />
                    <FormInput required name='email' label='Email' />
                    <FormInput required name='city' label='City' />
                    <FormInput required name='zip' label='Zip' /> 
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={ShippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
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
                            <Select value={ShippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                <MenuItem key={} value={}>
                                Select Me
                                </MenuItem>
                            </Select>
                        </Grid> 
                        <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                            <Select value={} fullWidth onChange={''}>
                                <MenuItem key={} value={}>
                                Select Me
                                </MenuItem>
                            </Select>
                        </Grid>  
                
            </form>

        </FormProvider>
    </>
    );
}

export default AddressForm;