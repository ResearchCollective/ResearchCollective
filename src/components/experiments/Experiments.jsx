import { Button, Modal } from '@aragon/ui';
import React, { useState } from 'react';

import { Box, IconExternal} from '@aragon/ui';
import ExperimentsModal from './ExperimentsModal';
import VoteTable from '../VoteTable';
import MemberTable from '../MemberTable';
import * as Constants from '../../constants';

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
          <p className=" sectionSubTitle sectionBreak">  Experiments approved by the Research Collective are listed here.</p>
            <Button className="rc-button" onClick={open}>List Experiment</Button>
            <Modal className='experiment-modal' visible={opened} onClose={close}>
                <ExperimentsModal thread={ experimentsThread }/>
            </Modal>
            <Box>
            <p className="sectionSubTitle"> Experiments submitted to the Rinkeby DAO  <a  rel="noopener noreferrer" target="_blank" href="https://rinkeby.aragon.org/#/researchco/0xa7ab603bf2ee5de01907724634349b51b29f0697/">'ReviewBoard' <IconExternal style={{position: "relative", top: "-2px"}} size="small"/> </a></p>
            <VoteTable network="rinkeby" creatorId={Constants.REVIEWBOARD_RINKEBY} columns={Constants.COLUMNS_VOTES}/>
            </Box>
            <Box>
            <p className="sectionSubTitle"> Experiments submitted to the Discourse/Rinkeby DAO  <a  rel="noopener noreferrer" target="_blank" href="https://rinkeby.aragon.org/#/researchco/0xa7ab603bf2ee5de01907724634349b51b29f0697/">'ResearchCo' <IconExternal style={{position: "relative", top: "-2px"}} size="small"/> </a></p>

            <VoteTable network="rinkeby" creatorId={Constants.RESEARCHCO_RINKEBY} columns={Constants.COLUMNS_VOTES}/>
            </Box>
            <Box>
            <p className="sectionSubTitle"> Reviewers of the  <a  rel="noopener noreferrer" target="_blank" href="https://rinkeby.aragon.org/#/researchco/0xa7ab603bf2ee5de01907724634349b51b29f0697/">'ResearchCo Discourse' <IconExternal style={{position: "relative", top: "-2px"}} size="small"/> </a></p>
            <MemberTable network="rinkeby" columns={Constants.COLUMNS_MEMBERS} appAddress={Constants.RESEARCHCO_RINKEBY} />
            </Box>
        </div>
    )
}

export default Experiments;
