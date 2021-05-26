import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

import {
    Grid, makeStyles, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button
} from '@material-ui/core'
import ReplyIcon from '@material-ui/icons/Reply'

import api from '../../../../services/api'
import moment from 'moment'

import { Area } from './styles'

const ProducerDetails = () => {

    const history = useHistory()
    const { id } = useParams()
    const [producer, setProducer] = useState([])
    const birth = moment(producer.birthDate).locale('pt-br').format('D/MM/yyyy')

    useEffect(() => {
        const getProducer = async (id) => {
            const response = await api.getProducerById(id)
            setProducer(response.data)
        }
        getProducer(id)
    }, [])

    const classes = useStyles();
    const currencyReal = producer.farmingActivity?.averageCash.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

    return (
        <>
            <Area>
                <div className='title--box'>
                    <h3>{producer.name}</h3>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell className='title--table' align="left">Apelido</TableCell>
                                <TableCell className='title--table' align="left">Nascimento</TableCell>
                                <TableCell className='title--table' align="left">CPF</TableCell>
                                <TableCell className='title--table' align="left">Telefone</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">{producer.nickname}</TableCell>
                                <TableCell align="left">{birth}</TableCell>
                                <TableCell align="left">{producer.cpf}</TableCell>
                                <TableCell align="left">{producer.phone}</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableHead>
                            <TableRow>
                                <TableCell className='title--table' align="left">E-mail</TableCell>
                                <TableCell className='title--table' align="left">CEP</TableCell>
                                <TableCell className='title--table' align="left">Estado</TableCell>
                                <TableCell className='title--table' align="left">Cidade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">{producer.email}</TableCell>
                                <TableCell align="left">{producer.address?.zipCode}</TableCell>
                                <TableCell align="left">{producer.address?.uf}</TableCell>
                                <TableCell align="left">{producer.address?.city}</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableHead>
                            <TableRow>
                                <TableCell className='title--table' align="left">Bairro</TableCell>
                                <TableCell className='title--table' align="left">Rua</TableCell>
                                <TableCell className='title--table' align="left">Nº</TableCell>
                                <TableCell className='title--table' align="left">Referência</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">{producer.address?.district}</TableCell>
                                <TableCell align="left">{producer.address?.street}</TableCell>
                                <TableCell align="left">{producer.address?.houseNumber}</TableCell>
                                <TableCell align="left">{producer.address?.reference}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Area>

            <Area style={{ marginTop: 20 }}>
                <div className='title--box'>
                    <h3>Atividade</h3>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell className='title--table' align="left">Atividade Principal</TableCell>
                                <TableCell className='title--table' align="left">Atividade Secundária</TableCell>
                                <TableCell className='title--table' align="left">Período</TableCell>
                                <TableCell className='title--table' align="left">Ganho Médio</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">{producer.farmingActivity?.activityName?.label}</TableCell>
                                <TableCell align="left">Agricultor</TableCell>
                                <TableCell align="left">{producer.farmingActivity?.period}</TableCell>
                                <TableCell align="left">{currencyReal}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Area>

            <Area style={{ marginTop: 20 }}>
                <div className='title--box'>
                    <h3>Produtos</h3>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableBody>
                            <TableRow>
                                {producer.products?.map((i) =>
                                    <Link className='product--table' to={`/product-details/${i.value}`}>
                                        <TableCell key={i.value} align="left">{i.label}</TableCell>
                                    </Link>
                                )}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Area>
            <Grid container
                direction="row"
                justify="left"
                alignItems="center"
                spacing={2}
            >
                
                <Grid item xs={12}>

                </Grid>

                <Grid item xs={10} sm={4} md={2}>
                    <Button 
                        variant="contained"
                        color="primary"
                        startIcon={<ReplyIcon />}
                        className={classes.buttonBack}
                        onClick={() => history.goBack()}
                        size='small'
                    >
                        Voltar
                    </Button>
                </Grid>
                
            </Grid>
        </>
    );
}

export default ProducerDetails

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    buttonBack: {
        margin: 2,
        backgroundColor: '#458CB8',
        width: '100%',
        '&:hover': {
            background: '#33617D'
        },
    },
})
