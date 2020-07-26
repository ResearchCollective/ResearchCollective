import React, { Component } from 'react';
import { DataView} from '@aragon/ui';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from 'apollo-boost';
import ProfileHover from 'profile-hover';
import Loading from "./Loading";

class Registry extends Component {
    state = {
        client: false,
        graphData: []
    };

  componentDidMount() {
     if (this.state.graphData === undefined  || this.state.graphData.length < 1) {
       this.loadData();
     }
 };

loadData() {
    var client = new ApolloClient({
          cache: new InMemoryCache(),
           uri: "https://api.thegraph.com/subgraphs/name/aragon/aragon-tokens-" + this.props.network});
           client.query({
            query: gql`
            {
              miniMeTokens(first: 20, where: { orgAddress: "${this.props.appAddress}"}) {
                holders{
                  address
                  balance
                }
              }
            }
        `
      }).then(result =>  this.setState({graphData: result.data.miniMeTokens[0].holders, client: client}))};


render() {
      return (
          <div>
             {this.state.graphData &&  <Loading data={this.state.graphData}/>}
             {this.state.graphData.length > 0 &&
                 <DataView  theme={'light'}
                    fields={this.props.columns}
                    entries={this.state.graphData}
                    renderEntryExpansion={({description}) => {
                          return [<h1 style={{width: "100%"}}>{description}</h1>]
                    }}
                    renderEntry={({ address, balance}) => {
                        return [
                            <ProfileHover address={address} showName={true}/>,
                            <div> {balance} </div>]
                     }
                   }
                />
            }
       </div>
    );
  }
}




export default Registry;
