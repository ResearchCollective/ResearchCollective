import { Button, Modal } from '@aragon/ui';
import React, { useState } from 'react';

import ExperimentsList from './ExperimentsList';
import ExperimentsModal from './ExperimentsModal';

const Experiments = () => {

    const [opened, setOpened ] = useState(false)

    const open = () => setOpened(true)

    const close = () => setOpened(false)
     
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