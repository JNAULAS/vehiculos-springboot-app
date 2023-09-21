import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';


import React, { useEffect, useState } from "react";

const listaTipoVehiculo = [
    {
        codigo: 1,
        nombre: 'Auto'
    },
    {
        codigo: 2,
        nombre: 'Camioneta'
    },
    {
        codigo: 3,
        nombre: 'Camión'
    }
]

const AdministradorVehiculo = () => {
    // hookst
    const [listTipoVehiculo, setListTipoVehiculo] = useState([])
    const [tipoVehiculo, setTipoVehiculo] = useState({})
    const [placa, setPlaca] = useState('')
    const [modelo, setModelo] = useState('')
    const [marca, setMarca] = useState('')
    const [listVehiculosRegistrados, setListVehiculosRegistrados] = useState([])

    const onchangeInputs = (id, value) => {
        console.log(value)
        switch (id) {
            case 'placa':
                setPlaca(value);
                break
            case 'modelo':
                setModelo(value);
                break
            case 'marca':
                setMarca(value);
                break
            default:
                break
        }
    }
    const onChangeSelectField = (field, option) => {
        if (field === undefined || option === undefined) return
        switch (field) {
            case 'tipoVehiculo':
                setTipoVehiculo(option)
                break
            default:
                break
        }
    }

    const hadleSave = async () => {
        //console.log('Datos a Guardar: ' + placa + ', TipoVehiculo: ' + tipoVehiculo.props.value + ' ' + tipoVehiculo.props.children)

        try {
            // Construye objeto
            const param = {
                placa: placa,
                modelo: modelo,
                marca: marca
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(param)
            };
            const response = await fetch('http://localhost:3006/api/addVehiculos', requestOptions);
            const data = await response.json();

            console.log('DATOS REGISTRO VEHICULO')
            console.log(data)
            setPlaca(data.placa)
            setModelo(data.modelo)
            setMarca(data.marca)
            setListVehiculosRegistrados(data)

        } catch (error) {
            console.log(error);
        } finally {
            console.log("Finally");
        }
    }
    useEffect(() => {
        //setListTipoVehiculo(listaTipoVehiculo)
    }, [])
    // return
    return (
        <Card sx={{}}>
            <Container fixed>
                <Select
                    id="listVehiculo"
                    value={tipoVehiculo.nombre}
                    option={listaTipoVehiculo}
                    variant="filled" color="success"
                    label="Tipo Vehiculo"
                    onChange={(event, option) => onChangeSelectField('tipoVehiculo', option)}
                    sx={{ m: 1, width: '42ch' }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Auto</MenuItem>
                    <MenuItem value={2}>Camioneta</MenuItem>
                    <MenuItem value={3}>Camioneta</MenuItem>
                </Select>
                <br />
                <TextField
                    id="placa"
                    label="Placa"
                    value={placa}
                    onChange={(event) => onchangeInputs('placa', event.target.value)}
                    variant="filled" color="success"
                    sx={{ m: 1, width: '30ch' }}
                />
                <br />
                <TextField
                    id="modelo"
                    label="Modelo"
                    value={modelo}
                    onChange={(event) => onchangeInputs('modelo', event.target.value)}
                    variant="filled" color="success"
                    sx={{ m: 1, width: '30ch' }}
                />
                <br />
                <TextField
                    id="marca"
                    label="Marca"
                    value={marca}
                    onChange={(event) => onchangeInputs('marca', event.target.value)}
                    variant="filled" color="success"
                    sx={{ m: 1, width: '30ch' }}
                />
                <div>
                    <br />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Código</TableCell>
                                    <TableCell align="right">Modelo</TableCell>
                                    <TableCell align="right">Marca</TableCell>
                                    <TableCell align="right">Año</TableCell>
                                    <TableCell align="right">Cilindraje</TableCell>
                                    <TableCell align="right">Valor</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listVehiculosRegistrados.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.modelo}</TableCell>
                                        <TableCell align="right">{row.marca}</TableCell>
                                        <TableCell align="right">{row.anno}</TableCell>
                                        <TableCell align="right">{row.cilindraje}</TableCell>
                                        <TableCell align="right">{row.valor}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div>
                    <br />
                    <Button variant="contained" onClick={hadleSave}>Guardar</Button>
                </div>
                <br />
                <br />
            </Container>
        </Card>
    )
}
export default AdministradorVehiculo