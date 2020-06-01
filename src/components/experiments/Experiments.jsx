import { Button, Modal } from '@aragon/ui';
import React, { useEffect, useState } from 'react';

import ExperimentsList from './ExperimentsList';
import ExperimentsModal from './ExperimentsModal';

const Experiments = ({experimentsThread}) => {

    console.log('Experiements Thread:',experimentsThread)

    // state for opening and closing modal// 
    const [opened, setOpened ] = useState(false)

    //this are methods to open and close modal//
    const open = () => setOpened(true)
    const close = () => setOpened(false)

    // this method is to join the "thread" of experiments//
    // const joinExperimentsThread = async() => {
    //     const experimentsThread = await space.joinThread('researchCollectiveExperiments')
    //     console.log(experimentsThread) 
    // }

    //lifecycle method to join thread when component is loaded - this will re-render the component if state or props if updated//
    // useEffect(() => {
    //     joinExperimentsThread()
    // })
      
    return(
        <div className='experiments'>
            <Button mode='positive' onClick={open}>Create New</Button>
            <Modal className='experiment-modal' visible={opened} onClose={close}>
                <ExperimentsModal />
            </Modal>
            <ExperimentsList/>
        </div>
    )
}

export default Experiments