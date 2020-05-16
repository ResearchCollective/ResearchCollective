import React, { Component } from 'react';
import { Button, Box, IconExternal, DataView } from '@aragon/ui';
import Loading from "./Loading"
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';


class Votes extends Component {
  constructor(props) {
      super(props);
       this.state = {
            client: false,
            voteData: null
       };
   }

 componentDidMount() {
     this.loadData();
 };


 loadData() {
   var client = new ApolloClient({
   uri: 'https://api.thegraph.com/subgraphs/name/protofire/aragon'});
   client.query({
     query: gql`
     {
         votes(orderBy: created, orderDirection: desc, where: {creator: "0xc6c1725868210736c3bcb784b4c13c6412823096"}){
           metadata
           createdAtTransaction
           created
         }
       }
     `
   }).then(result =>  this.setState({voteData: result.data.votes, client: client}))}


render() {


  console.log("State of Voting Data just set: " + this.state.voteData);

      if (!this.state.voteData) {
           return <div />
       }
      return (
          <div>
            <h1 className="sectionTitle pushUp"> Votes </h1>
            <p className="sectionSubTitle pushUp"> passed by the Non-Profit/DAO <a  rel="noopener noreferrer" target="_blank" href="https://mainnet.aragon.org/#/research">'Research Collective' <IconExternal style={{position: "relative", top: "-2px"}} size="small"/> </a>   </p>
             <Box>
              {this.state.voteData &&  <Loading data={this.state.voteData}/>}
              {this.state.voteData.length > 0 &&  <div>
                  <DataView
                     fields={['Description', 'Link']}
                     entries={this.state.voteData}
                     renderEntry={({ metadata, createdAtTransaction }) => {
                       if (metadata) {
                        return [<h1>{metadata} </h1>, <div  className="buttonContainer txnButton"> <a rel="noopener noreferrer" target="_blank" href={"https://etherscan.io/tx/" + createdAtTransaction}><Button icon={<IconExternal/>}  /> </a> </div>
                       ]
                     } else {
                       return [<></>];
                     }
                     }}
                   />
                </div>}
            </Box>
            </div>
    );
  }
}




export default Votes;
