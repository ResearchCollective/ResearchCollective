import { Box as AragonBox, DataView } from '@aragon/ui';
import React from 'react';

const ExperimentsList = ({thread}) => {

    const getExperiments = async() => {
        if(thread!= null){
            let data = await thread.getPosts()
            console.log('Experiments: ',data)
        }
    }

    getExperiments()
    return(
        <div>
            <AragonBox className='experiments-list'>
            <DataView style={{position: "absolute", top: "500px"}}
              fields={['id', 'title', 'description']}
              entries={[
                  {id: 1, title: 'Experiment 1', description: 'This is description 1 for the Experiment 1 ....'},
                  {id: 2, title: 'Experiment 2', description: 'This is description 2 for the Experiment 2 ....'},
                  {id: 3, title: 'Experiment 3', description: 'This is description 3 for the Experiment 3 ....'}
              ]}
              renderEntry={({ id, title, description }) => {
                return [<p>{id}</p>, <p>{title}</p>,<p>{description}</p>]
              }}
            />
        </AragonBox>
        </div>
    )
}

export default ExperimentsList
