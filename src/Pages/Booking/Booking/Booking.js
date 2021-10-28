import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Booking = () => {
    const { serviceId } = useParams();
    const [ service, setService ] = useState( {} );

    useEffect( () => {
        fetch( `https://radiant-scrubland-25175.herokuapp.com/services/${ serviceId }` )
            .then( res => res.json() )
            .then( data => setService( data ) );
    }, [] );

    console.log( service );

    return (
        <div>
            <h2>Details of: { service?.name }</h2>
            <h2>This is Booking No: { serviceId }</h2>
        </div>
    );
};

export default Booking;