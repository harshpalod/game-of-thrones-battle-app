import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { PinDropRounded, LocationSearchingRounded, CategoryRounded, BlurOffRounded, NotInterestedRounded  } from '@material-ui/icons';

const styles = theme => ({
    root: {
        background: '#070919',
        borderRadius: 3,
        border: 0,
        padding: '0 20px',
        boxShadow: '0 2px 4px 1px',
        color: '#E8E8E8',
        margin: 20
    },
    media: {
        height: 300,
        paddingTop: '50'
    },
    win: {
        backgroundColor: '#1EC943',
        width: theme.spacing(7),
        height: theme.spacing(7),
        fontSize: 17,
    },
    lose: {
        backgroundColor: '#B02738',
        width: theme.spacing(7),
        height: theme.spacing(7),
        fontSize: 17,
    },
    title: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 400
    },
    subtitle: {
        color: '#AC572B',
        fontSize: 15,
        fontWeight: 400
    },
    root2: {
        backgroundColor: '#1E1E1E',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
        padding: '10px',
        minWidth: '20%',
        borderRadius: 20,
        position: 'relative', 
        zIndex: 4, 
        top: 110, 
        marginBottom: -250,
        boxShadow: '0 2px 4px 1px',
        '@media (max-width:600px)': {
            position: 'relative',
            zIndex: 4, 
            top: 0,
            marginBottom: 0
         }
    },
    responsiveLayout: {
        display: 'flex',
        flexDirection: 'row',
        '@media (max-width:600px)': {
            display: 'flex',
            flexDirection: 'column'
        }
    }
});

class BattleItem extends Component {

    static propTypes = {
        battle: PropTypes.instanceOf(Object)
    };

    static defaultProps = {
        battle: null
    };

    constructor(props) {
        super(props);

        this.state = {
            // The battles on current location
            activeBattle: this.props.battle
        };
    }

    render() {
        const { classes } = this.props;
        const {
            state: {
                activeBattle
            }
        } = this;

        let attackerComponent;
        let defenderComponent;
        let battlesListComponent; // combined common, attacker and defender details

        let attackerOutcome;
        let defenderOutcome;

        //common data for battle
        let commonComponent = (
            <div className={classes.root2} >
                <Chip
                    icon={<PinDropRounded />}
                    label={activeBattle.name}
                    clickable={false}
                    color="primary"
                />
                <Chip
                    icon={<CategoryRounded />}
                    label={activeBattle.battle_type}
                    clickable={false}
                    color="secondary"
                />
                <Chip
                    icon={<BlurOffRounded />}
                    label={'Major Death: ' + activeBattle.major_death}
                    clickable={false}
                    color="secondary"
                />
                <Chip
                    icon={<NotInterestedRounded />}
                    label={'Major Capture: ' + activeBattle.major_capture}
                    clickable={false}
                    color="secondary"
                />
                <Chip
                    icon={<LocationSearchingRounded />}
                    label={activeBattle.region}
                    clickable={false}
                    color="secondary"
                />
            </div>
        );

        if (activeBattle.attacker_outcome === 'win') {
            attackerOutcome = (
                <CardHeader
                    classes={{
                        title: classes.title,
                        subheader: classes.subtitle
                    }}
                    avatar={
                        <Avatar className={classes.win}>
                            Victory
                        </Avatar>
                    }
                    title={activeBattle.attacker_king}
                    subheader="Attacker King"
                />
            );
            defenderOutcome = (
                <CardHeader
                classes={{
                        title: classes.title,
                        subheader: classes.subtitle
                    }}
                    avatar={
                        <Avatar aria-label="lost" className={classes.lose}>
                            Defeat
                        </Avatar>
                    }
                    title={activeBattle.defender_king}
                    subheader="Defender King"
                />
            );
        } else {
            attackerOutcome = (
                <CardHeader
                classes={{
                        title: classes.title,
                        subheader: classes.subtitle
                    }}
                    avatar={
                        <Avatar aria-label="lost" className={classes.lose}>
                            Defeat
                        </Avatar>
                    }
                    title={activeBattle.attacker_king}
                    subheader="Attacker King"
                />
            );
            defenderOutcome = (
                <CardHeader
                classes={{
                        title: classes.title,
                        subheader: classes.subtitle
                    }}
                    avatar={
                        <Avatar aria-label="win" className={classes.win}>
                            Victory
                        </Avatar>
                    }
                    title={activeBattle.defender_king}
                    subheader="Defender King"
                />
            );
        }

        if (activeBattle != null) {
            //Attacker Component
            attackerComponent = (
                <Card className={classes.root}>
                    {attackerOutcome}
                    <CardMedia
                        className={classes.media}
                        image={require("../images/attacker.jpg")}
                        component="img"
                        title="Attacker image"
                    />
                    <CardContent>
                        <Typography variant="subtitle1" color="inherit">
                            Commander: {activeBattle.attacker_commander}
                        </Typography>
                        <Typography variant="h4" color="inherit">
                            Army Size: {activeBattle.attacker_size}
                        </Typography>
                        <Typography variant="subtitle2">
                            {activeBattle.attacker_1 !== "" &&
                                <p>
                                    Attacker 1: {activeBattle.attacker_1}
                                </p>
                            }
                            {activeBattle.attacker_2 !== "" &&
                                <p>
                                    Attacker 2: {activeBattle.attacker_2}
                                </p>
                            }
                            {activeBattle.attacker_3 !== "" &&
                                <p>
                                    Attacker 3: {activeBattle.attacker_3}
                                </p>
                            }
                            {activeBattle.attacker_4 !== "" &&
                                <p>
                                    Attacker 4: {activeBattle.attacker_4}
                                </p>
                            }
                        </Typography>
                    </CardContent>
                </Card>
            );

            //Defender Component
            defenderComponent = (
                <Card className={classes.root}>
                    {defenderOutcome}
                    <CardMedia
                        className={classes.media}
                        image={require("../images/defender.jpg")}
                        title="Defender image"
                        component="img"
                    />
                    <CardContent>
                        <Typography variant="subtitle1" color="inherit">
                            Commander: {activeBattle.defender_commander}
                        </Typography>
                        <Typography variant="h4" color="inherit">
                            Army Size: {activeBattle.defender_size}
                        </Typography>
                        <Typography variant="subtitle2">
                            {activeBattle.defender_1 !== "" &&
                                <p>
                                    Defender 1: {activeBattle.defender_1}
                                </p>
                            }
                            {activeBattle.defender_2 !== "" &&
                                <p>
                                    Defender 2: {activeBattle.defender_2}
                                </p>
                            }
                            {activeBattle.defender_3 !== "" &&
                                <p>
                                    Defender 3: {activeBattle.defender_3}
                                </p>
                            }
                            {activeBattle.defender_4 !== "" &&
                                <p>
                                    Defender 4: {activeBattle.defender_4}
                                </p>
                            }
                        </Typography>
                    </CardContent>
                </Card>
            );

            battlesListComponent = (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {commonComponent}
                    <div className={classes.responsiveLayout}>
                        {attackerComponent}
                        {defenderComponent}
                    </div>
                </div>

            );
        } else {
            battlesListComponent = (
                <div class="no-battles">
                    No battles Searched, It's peaceful out here!
                </div>
            );
        }


        return (
            <Fragment>
                {battlesListComponent}
            </Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(BattleItem);
