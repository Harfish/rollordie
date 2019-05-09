import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'

const App = () => <Roll />;

class Roll extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      total: 0,
      roll: '-',
      isDisabled: false,
      totalStyle: 'ok',
      result: '',
      game: '',
      animate: 'dice'
    };
    this.onRoll=this.onRoll.bind(this)
   }
  
  detectResult = () => {
    if (this.state.total > 15 && this.state.total < 20) {
      this.setState((state) => ({
          totalStyle: 'danger'
      }))
    } else if (this.state.total > 20) {
      this.setState((state) => ({
        isDisabled: true,
        totalStyle: 'bust',
        result: 'lose',
        game: 'over'
    }))
    } else if (this.state.total === 20) {
      this.setState((state) => ({
        isDisabled: true,
        totalStyle: 'win',
        result: 'win',
        game: 'over'
    }))
    }
    
  }
   
  onRoll = () => {
    this.setState((state) => ({
      animate: 'diceshaking',
      isDisabled: true
    }))
    var delay = Math.floor(Math.random() * 500) + 1000
    setTimeout(() => {
      this.setState({ roll:  Math.floor(Math.random() * 6) + 1});
      this.setState((state) => ({
        animate: 'dice',
        isDisabled: false,
        total: state.total + state.roll
    }),() => {this.detectResult()}
    )}
    ,delay)
    
  };
  
  resetGame = () => {
    this.setState((state) => ({
      total: 0,
      roll: '-',
      isDisabled: false,
      totalStyle: 'ok',
      result: '',
      game: '',
      animate: 'dice'
    }))
  }

  styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });
  
  render() {
    return (
      <div>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Roll Or Die
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
          <Grid item>
            <Paper style={{ textAlign: "center" }}>
              <p>Roll or Die is a simple dice game. Simply roll until you get exactly 20 to win.</p>
              <img src={process.env.PUBLIC_URL + '/images/' +  this.state.roll + '.png'} alt='dice' className={this.state.animate}></img>
            </Paper>
          </Grid>
        </Grid>
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
          <Grid item>
            <Paper className="rounded">
              <Button type="button" onClick={this.onRoll} disabled={this.state.isDisabled} variant="contained" color="primary">
                Roll
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
          <Grid item>
            <Paper>
              <p className={this.state.totalStyle}>Total: {this.state.total}</p>
            </Paper>
          </Grid>
        </Grid>
        { this.state.game === 'over' &&
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
          <Grid item>
            <Paper className="rounded" style={{textAlign: 'center'}}>
            <h2><p>You {this.state.result}!</p></h2>
              <Button type="button" onClick={this.resetGame} variant="contained" color="secondary">
                Reset
              </Button>
            </Paper>
          </Grid>
        </Grid>
        }
      </div>
      );
    }
  }

export default App;