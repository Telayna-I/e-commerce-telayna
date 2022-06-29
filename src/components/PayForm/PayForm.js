import './PayForm.css'
import { useForm } from 'react-hook-form'
import { FaEnvelope, FaPhoneAlt, FaAddressCard } from "react-icons/fa";
import { MdDangerous } from "react-icons/md";
import { useAuth } from '../../Context/AuthContext';


const PayForm = () => {

    const {register, formState :{errors} , handleSubmit} = useForm();

    const { credential, infoContact } = useAuth()

    const onSubmit = (data) => {
        infoContact(data)
    }
    

    return(
        <div className = 'pay-form'>
            <h2 className ='h2-pay-form'>Datos para el envio</h2>
            <div className = "shipping-form-container">
                <form className='shipping-form' onSubmit ={handleSubmit(onSubmit)}>
                    {!credential.length > 0 && <div className = 'campo radius-t arriba'>
                        <FaEnvelope className='input-icon'/>
                        <input className='input-form radius-t' type = 'text'
                        autoComplete = 'off'
                        placeholder = 'Nombre'
                        name='name'
                        {...register('name', {
                            required:{
                                value: true,
                                message: 'El campo nombre es requerido',
                            },
                            minLength: {
                                value: 4,
                                message: "El nombre debe tener al menos 4 caracteres"
                            }
                        })}
                        />
                    </div>}
                    <div className = 'campo radius-t arriba'>
                        <FaPhoneAlt className='input-icon' />
                        <input className='input-form radius-t' type = 'text'
                        autoComplete = 'off'
                        placeholder = 'Telefono'
                        name='phone'
                        {...register('phone', {
                            required:{
                                value: true,
                                message: 'El campo telefono es requerido',
                            },
                            minLength: {
                                value: 10,
                                message: "El telefono debe tener al menos 10 caracteres"
                            },
                            pattern: {
                                value: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
                                message: "El formato de telefono no es correcto"
                            }
                        })}
                        />
                    </div>
                    <div className = 'campo radius-b abajo'>
                        <FaAddressCard className='input-icon' />
                        <input className='input-form radius-t' type = 'text'
                        autoComplete = 'off'
                        placeholder = 'Direccion'
                        name='address'
                        {...register('address', {
                            required:{
                                value: true,
                                message: 'El campo dirección es requerido',
                            },
                            minLength: {
                                value: 10,
                                message: "La dirección tener al menos 10 caracteres"
                            },
                        })}
                        />
                    </div>
                    
                <button type="submit" value="submit" className = 'button-submit bstmb' > Confirmar</button>
                </form>
            </div>
            <div className='messages'>
                <div className='message'>
                    {errors.phone && <span className='error-message'>{errors.phone.message}</span>}
                    <div className = 'caja-boton'>
                        {errors.phone && <MdDangerous className='icon-error'/>}
                    </div>
                </div>
                <div className='message'>
                    {errors.address && <span className='error-message'>{errors.address.message}</span>}
                    <div className = 'caja-boton'>
                        {errors.address && <MdDangerous className='icon-error'/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayForm