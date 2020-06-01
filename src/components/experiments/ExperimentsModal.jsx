import { Button, TextInput } from '@aragon/ui';
import React, { useState } from 'react';

const ExperimentsModal = () => {

    const [data, setData] = useState({
        // more values will be added soon//
        id: '',
        title: ''
    })

    const handleOnChange = (e) => {
        let {name, value} = e.target
        setData( prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    console.log('Data', data)
    
    return(
        <div className='experiments-form'>
            <TextInput className='fullWidth' placeholder='Enter Title' wide={true} name='title' value={data.title} onChange={e => handleOnChange(e)}/>
            <Button mode='positive' label='Save'/>
        </div>
    )
}

export default ExperimentsModal