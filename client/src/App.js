import React from 'react'
import './App.css'
import axios from 'axios'
// import Autocomplete from './components/Autocomplete'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import TopBar from './components/TopBar'
import BattleItem from './components/BattleItem'

let URL = "http://localhost:8080"
if (process.env.NODE_ENV === "production") {
  URL = "https://game-of-thrones-battle-ground.herokuapp.com";
}
class App extends React.Component {
  state = {
    locations: [],
    battles: [],
    battleCount: 0
  };

  componentWillMount() {
    axios.get(URL + "/list")
      .then(res => res.data)
      .then(data => this.setState({ locations: data }));
      //collect count of battles
    this.getBattleCount()
  }

  getBattleCount() {
    axios.get(URL + "/list/count")
      .then((response) => {
        const data = response.data;
        this.setState({ battleCount: data });
        console.log('Battle Count Data has been received!!' + data);
      })
      .catch(() => {
        alert('Error retrieving Battle Count data!!!');
      });
    
  }

  getBattleInfoByLocation(value) {
    var inputLocation = value
    axios.get(URL + "/list/search?location="+inputLocation)
      .then((response) => {
        const data = response.data;
        this.setState({ battles: data });
        console.log('Battles Data has been received!!' + JSON.stringify(data));
      })
      .catch(() => {
        alert('Error retrieving Battles data!!!');
      });
    
  }

  displayBattleInfo = (battles) => {
    if (!battles.length) return null;

    return battles.map((battle, index) => (
      // console.log("Battle: "+battle);
      <div key={index} style={{ marginTop: 30 }}>
        <BattleItem 
          battle = {battle}
        />
      </div>
    ));
  };

  render() {
    return (
      <div className="App">
        <TopBar battleCount={this.state.battleCount} />
        <Autocomplete
          freeSolo
          id="autocomplete-box-01"
          options={this.state.locations}
          style={{ width: '50%', margin: 15 }}
          autoHighlight
          autoComplete
          onChange={(e, value) => this.getBattleInfoByLocation(value)}
          renderInput={(params) => <TextField {...params} label="Search by Location" variant="outlined" />}
        />

        {this.displayBattleInfo(this.state.battles)}

        {/* local implementation of AutoComplete */}
        {/* <Autocomplete
            suggestions={this.state.locations}
          /> */}
      </div>
    );
  }
}

export default App;
