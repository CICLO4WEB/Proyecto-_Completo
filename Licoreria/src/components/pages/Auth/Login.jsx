import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { parseJwt } from '../../../helpers/destructure-jwt';
import { login } from '../../../services/users';

const initialState = {
    inputs: {
        correo: "",
        password: ""
    },
    warn: {
        ok: false,
        msg: "",
        type: ""
    }
}

export const Login = ({setIsAuth}) => {

    const [inputValue, setInputValue] = useState(initialState.inputs);
    const [warn, setWarn] = useState(initialState.warn);
    
    const navigate = useNavigate();
    
    const handleInputs = e => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        })
    }
    
    const handleLogin = async () => {

        if (inputValue.correo.length === 0 || inputValue.password.length === 0)
            return setWarn({
                ok: true,
                msg: "Hay campos vacíos *",
                type: "danger"
            })

        const payload = {
            correo: inputValue.correo,
            password: inputValue.password
        }

        const { ok, msg, ...rest } = await login(payload);

        if (!ok) {
            setWarn({
                ok: true,
                msg: msg,
                type: "danger"
            })
        }
        else {
            localStorage.setItem('lico-token', rest.token);
            const {rol} = parseJwt(rest.token);
            if (rol==="ADMIN_ROLE") {
                setIsAuth({is: true, rol: rol})
                setTimeout( () => {navigate('/admin/productos')}, 1000)
                
            }
            else{
                setIsAuth({is: true, rol: rol})
                setTimeout( () => {navigate('/user/productos')}, 1000)
            }    
        }

    }

    return (
        <section style={{ height: "100vh", display: 'grid', placeContent: "center" }}>

            <div className="shadow rounded p-4 bg-body" style={{ maxWidth: "400px", minWidth: "300px" }}>
                <h5 className='text-primary'>LOG-IN</h5>
                {
                    warn.ok &&
                    <div className={`alert alert-${warn.type}`} role="alert">
                        {warn.msg}
                    </div>
                }
                <form className='mb-4'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
                        <input onChange={handleInputs} type="email" name='correo' className="form-control" id="correo" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">- No compartiremos tu información.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                        <input onChange={handleInputs} type="password" name='password' className="form-control" id="password" />
                    </div>
                    <button type="button" onClick={handleLogin} className="btn btn-primary">Iniciar sesión</button>
                </form>
                <p style={{ fontSize: "13px" }}>Aún no tienes una cuenta?<Link to="/auth/register"> Regístrate</Link></p>
            </div>

        </section>
    )
}
