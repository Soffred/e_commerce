import React from 'react';
import Grid from '@material-ui/core/Grid';

import Product from './product/Product';


const products = [
    { id: 1, name: "Shoes", description: "Running schoes", price:"$10" },
    { id: 2, name: 'Bike', description: "Super fast bike", price:"$5" },
];



const Products = () => {
    return(
        <main>
        <Grid container justify="center" spacing={4}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} />
                </Grid>
            ))}
        </Grid>
        </main>

    );
}

export default Products;