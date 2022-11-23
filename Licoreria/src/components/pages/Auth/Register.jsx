import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUser } from '../../../services/users';

const initialState = {
    inputs: {
        correo: "",
        nombre: "",
        password: ""
    },
    warn: {
        ok: false,
        msg: "",
        type: ""
    }
}

export const Register = () => {

    const [inputValue, setInputValue] = useState(initialState.inputs);
    const [warn, setWarn] = useState(initialState.warn);

    const handleInputs = e => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = async () => {
        if (
            inputValue.correo.length === 0 ||
            inputValue.nombre.length === 0 ||
            inputValue.password.length === 0 
        ) {
            return setWarn({
                ok: true,
                msg: "Hay campos vacíos *",
                type: "danger"
            })
        }

        const payload = {
            correo: inputValue.correo,
            nombre: inputValue.nombre,
            password: inputValue.password,
            rol: "USER_ROLE"
        }

        const {ok, ...rest} = await createUser(payload);

        if ( rest.errors ) {
            return setWarn({
                ok: true,
                msg: rest.errors[0].msg,
                type: "danger"
            })
        }
        if ( ok ) {
            return setWarn({
                ok: true,
                msg: "Usuario registrado con éxito",
                type: "success"
            })
        }
        else {
            return setWarn({
                ok: true,
                msg: rest.msg,
                type: "danger"
            })
        }
    }

    return (
        <section style={{ height: "100vh", display: 'grid', placeContent: "center" }}>

            <div className="shadow rounded p-4 bg-body" style={{ maxWidth: "400px", minWidth: "300px" }}>
                <h5 className='text-primary'>REGISTRO</h5>
                {
                    warn.ok &&
                    <div className={`alert alert-${warn.type}`} role="alert">
                        {warn.msg}
                    </div>
                }
                <form className='mb-4'>
                    <div className="mb-1">
                        <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
                        <input onChange={handleInputs} type="email" name='correo' className="form-control" id="correo" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="exampleInputPassword1" className="form-label">Nombre</label>
                        <input onChange={handleInputs} type="text" name='nombre' className="form-control" id="nombre" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                        <input onChange={handleInputs} type="password" name='password' className="form-control" id="password" />
                    </div>
                    <button type="button" onClick={handleRegister} className="btn btn-primary">Registrar</button>
                </form>
                <p style={{ fontSize: "13px" }}>Ya tienes una cuenta?<Link to="/auth/login"> Inicia sesión</Link></p>
            </div>

        </section>
    )
}
