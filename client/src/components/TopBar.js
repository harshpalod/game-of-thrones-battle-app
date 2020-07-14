import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    toolbarContentAlign: {
        display: 'flex',
        justifyContent: 'space-between',
        '@media (max-width:600px)': {
            display: 'flex',
            flexDirection: 'column'
        }
    }
  }));

const TopBar = (props) => {
    const classes = useStyles()
    return(
        <div style={{ width: '100%' }}>
        <AppBar position="static" color="primary">
            <Toolbar className={classes.toolbarContentAlign}>
                <Typography variant="h5" color="inherit">
                    Game of Thrones - Battle Ground!
                </Typography>
                <Typography variant="h5" color="inherit" align="right">
                    Total battles: {props.battleCount}
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default TopBar;