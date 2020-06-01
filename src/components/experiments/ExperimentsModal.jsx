import { Button, TextInput } from '@aragon/ui';
import { sha256 } from 'js-sha256';
import React, { useState } from 'react';

const ExperimentsModal = ({thread}) => {

    const [data, setData] = useState({
        // more values will be added soon//
        title: ''
    })

    const handleOnChange = (e) => {
        let {name, value} = e.target
        setData( prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const generateID = () => {
        let hash = sha256('research-collective-experiments-thread')
        let timeStamp = new Date()
        let id = hash+timeStamp
        return id
    }

    const addToThread = () => {
        if(thread!=null){
            //create the experiment object - more fields will be added later//
            let newExperiment = {
                id: generateID(),
                title: data.title
            }
            thread.post(newExperiment)
            console.log('Saved to thread!!!', thread)
        }else{
            alert('No Thread Found!!!')
        }     
    }
    console.log('Data', data)
    
    return(
        <div className='experiments-form'>
            <TextInput className='fullWidth' placeholder='Enter Title' wide={true} name='title' value={data.title} onChange={e => handleOnChange(e)}/>
            <Button mode='positive' label='Save' onClick={addToThread}/>
        </div>
    )
}

export default ExperimentsModal