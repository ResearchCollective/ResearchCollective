import { Button, Modal } from '@aragon/ui';
import React, { useState } from 'react';

import ExperimentsList from './ExperimentsList';
import ExperimentsModal from './ExperimentsModal';
import VoteTable from '../VoteTable';
import * as Constants from '../../constants';

const CURATION_COLUMNS = ['Title', 'Poster', 'URL'];

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
          <p className="sectionTitle"> Experiments </p>
           <p className="sectionSubTitle">🚨 Under Construction 🚨 </p>
          <p className=" sectionSubTitle sectionBreak">  You will be able to create a public thread on IPFS to track your experiments here soon.</p>
            <Button className="rc-button" onClick={open}>Create New</Button>
            <Modal className='experiment-modal' visible={opened} onClose={close}>
                <ExperimentsModal thread={ experimentsThread }/>
            </Modal>
            <VoteTable network="rinkeby" type="vote" creatorId={Constants.REVIEWBOARD_RINKEBY} columns={CURATION_COLUMNS}/>

        </div>
    )
}

export default Experiments;
