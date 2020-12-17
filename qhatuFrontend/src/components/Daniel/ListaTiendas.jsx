import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import 'fontsource-roboto';
import values from './models/eliminacionComerciante';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tittle: {
    textAlign: 'center',
  },
  value: {},
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardButton: {
    color: '#186CEF',
  },
  busqueda: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px',
  },
});

class ListaTiendas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valores: values.data(),
      inputValue: ' ',
      mostrarDetalles: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickChangeVerDetalles = this.handleClickChangeVerDetalles.bind(
      this
    );
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      inputValue: event.target.value,
    });
  }
  handleClickChangeVerDetalles(event) {
    this.setState({ mostrarDetalles: !this.state.mostrarDetalles });
    console.log(this.state.mostrarDetalles);
  }
  filtro() {
    const listItems = [];
    var j = 0;
    for (let i = 0; i < this.state.valores.length; i++) {
      if (
        this.state.valores[i].nombre
          .toLowerCase()
          .includes(this.state.inputValue.toLowerCase())
      ) {
        listItems[j] = this.state.valores[i];
        j++;
      }
    }
    return listItems;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <Typography
              className={classes.tittle}
              id="valoracionLabel"
              gutterBottom
              variant="h5"
              component="h2"
            >
              Tiendas
            </Typography>
          </div>

          <div className={classes.busqueda}>
            <TextField
              name="busqueda"
              label="Nombre"
              rows="1"
              onInput={this.handleInputChange}
              variant="outlined"
            />
          </div>

          <div>
            <Grid container spacing={3}>
              {this.filtro().map((value) => (
                <Grid item key={value.id} xs={12} sm={6}>
                  <Card className={classes.value.id} id={`cardOf${value.id}`}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={value.image}
                      title={value.nombre}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {value.nombre}
                      </Typography>
                      <Typography>
                        Creado el: {value.fCreacion[0]}/{value.fCreacion[1]}/
                        {value.fCreacion[2]}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        className={classes.cardButton}
                        aria-label="like"
                        onClick={this.handleClickChangeVerDetalles}
                      >
                        <DescriptionIcon /> Ver detalles
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </form>
      </div>
    );
  }
}
export default withStyles(useStyles)(ListaTiendas);
