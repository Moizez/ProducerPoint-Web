import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    makeStyles, Grid, TextField, Button, MenuItem
} from '@material-ui/core'
import ReplyIcon from '@material-ui/icons/Reply'
import SaveIcon from '@material-ui/icons/Save'

import api from '../../services/api'
import { profiles } from '../../enums'
import { AuthContext } from '../../contexts/AuthContext'

import WarningModal from '../../components/Modals/WarningModal'
import Success from '../../assets/lotties/success.json'
import Fail from '../../assets/lotties/fail.json'

const ProfileEdit = ({ data }) => {

    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const classes = useStyles()
    const history = useHistory()

    const [warningModal, setWarningModal] = useState(false)
    const [message, setMessage] = useState(true)
    const [lottie, setLottie] = useState('')
    const handleOpenWarningModal = () => setWarningModal(true)
    const handleCloseWarningModal = () => setWarningModal(false)



    useEffect(() => {
        const getProducerById = async () => {

            formik.setFieldValue('name', data?.name)
            formik.setFieldValue('nickname', data?.nickname)
            formik.setFieldValue('birthDate', data?.birthDate)
            formik.setFieldValue('cpf', data?.cpf)
            formik.setFieldValue('phone', data?.phone)
            formik.setFieldValue('email', data?.email)
            formik.setFieldValue('role', data?.role)
        }
        getProducerById()
    }, [data])

    const initialFormState = {
        name: '',
        nickname: '',
        birthDate: '',
        cpf: '',
        phone: '',
        email: '',
        role: ''
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required('Nome é obrigatório!'),
        birthDate: yup.date().required('Data é obrigatória!'),
        cpf: yup.string().required('CPF é obrigatório!'),
        phone: yup.string().required('Telefone é obrigatório!'),
        email: yup.string().email('E-mail inválido!').required('E-mail é obrigatório!'),
        role: yup.string().required('Perfil é obrigatório!'),
    })

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            const response = await api.updateManager(id, values)

            if (response.data) {
                setLottie(Success)
                setMessage(`Usuário atualizado com sucesso!`)
                handleOpenWarningModal()
                setTimeout(() => {
                    user.role == 0
                        ? window.location.href = `/admin-list/${user?.role}`
                        : window.location.href = `/my-profile/${user?.id}/${user?.role}`
                }, 2500);
            } else {
                setLottie(Fail)
                setMessage(`Falha inesperada! Erro: ${response.status}`)
                handleOpenWarningModal()
            }
        }
    })

    return (
        <>
            <div className={classes.titleBox}>
                <h3 className={classes.title}>Editar Administrador/Técnico</h3>
            </div>
            <Grid container>
                <Grid item xs={12}>
                    <div className={classes.formWrapper}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>

                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="name"
                                        name="name"
                                        label="Nome"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="nickname"
                                        name="nickname"
                                        label="Apelido"
                                        value={formik.values.nickname}
                                        onChange={formik.handleChange}
                                        error={formik.touched.nickname && Boolean(formik.errors.nickname)}
                                        helperText={formik.touched.nickname && formik.errors.nickname}
                                    />
                                </Grid>

                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="email"
                                        name="email"
                                        label="E-mail"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="birthDate"
                                        name="birthDate"
                                        label="Nascimento"
                                        type="date"
                                        value={formik.values.birthDate}
                                        onChange={formik.handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                                        helperText={formik.touched.birthDate && formik.errors.birthDate}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="cpf"
                                        name="cpf"
                                        label="CPF"
                                        value={formik.values.cpf}
                                        onChange={formik.handleChange}
                                        error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                                        helperText={formik.touched.cpf && formik.errors.cpf}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="phone"
                                        name="phone"
                                        label="Telefone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id="role"
                                        name="role"
                                        label="Perfil"
                                        value={formik.values.role}
                                        onChange={formik.handleChange}
                                        error={formik.touched.role && Boolean(formik.errors.role)}
                                        helperText={formik.touched.role && formik.errors.role}
                                        disabled={user?.role == 1 && true}
                                        select
                                    >
                                        {profiles.map((i) =>
                                            <MenuItem key={i.value} value={i.value}><em>{i.label}</em></MenuItem>
                                        )}
                                    </TextField>
                                </Grid>

                                <Grid container
                                    direction="row-reverse"
                                    justify="space-around"
                                    alignItems="center"
                                    spacing={2}
                                >
                                
                                    <Grid item xs={12} md={8}>

                                    </Grid>
                                    
                                    <Grid item xs={10} sm={4} md={2}>
                                        <Button
                                            onClick={formik.handleSubmit}
                                            className={classes.button}
                                            startIcon={<SaveIcon />}
                                            color="primary"
                                            variant="contained"
                                            fullWidth
                                            type="submit"
                                        >
                                            Salvar
                                        </Button>
                                    </Grid>

                                    <Grid item xs={10} sm={4} md={2}>
                                        <Button
                                            onClick={() => history.goBack()}
                                            className={classes.buttonBack}
                                            startIcon={<ReplyIcon />}
                                            color="primary"
                                            variant="contained"
                                            fullWidth
                                        >
                                            Voltar
                                        </Button>
                                    </Grid>
                                    
                                </Grid>

                            </Grid>

                        </form>
                    </div>
                </Grid>

            </Grid>
            {warningModal &&
                <WarningModal
                    handleClose={handleCloseWarningModal}
                    open={warningModal}
                    message={message}
                    lottie={lottie}
                />
            }
        </ >
    );
}

export default ProfileEdit

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(8),

    },
    button: {
        backgroundColor: '#070',
        width: '100%',
        '&:hover': {
            background: '#005200'
        },
    },
    buttonBack: {
        backgroundColor: '#458CB8',
        width: '100%',
        '&:hover': {
            background: '#33617D'
        },
    },
    titleBox: {
        height: 50,
        backgroundColor: '#ccc',
        paddingRight: 10,
        paddingLeft: 10,
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        justifyContent: 'space-between',
        display: 'flex'

    },
    title: {
        fontSize: 18,
        textTransform: 'uppercase'
    }

}));


