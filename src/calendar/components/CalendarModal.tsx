import Modal from 'react-modal';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useEffect, useMemo, useState } from 'react';
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { EventType } from '../../interfaces/interfaces';
import { getEnvVariables } from '../../helpers/getEnvVariables';

registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

if (getEnvVariables().VITE_MODE !== 'test') {
    Modal.setAppElement('#root');
}

export const formInitState: Partial<EventType> = {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 1),
    bgColor: '#fafafa',
};

export const CalendarModal = () => {
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] =
        useState<Partial<EventType>>(formInitState);

    useEffect(() => {
        if (activeEvent !== null && isDateModalOpen) {
            setFormValues({
                ...activeEvent,
            });
        }
    }, [isDateModalOpen]);

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';
        return formValues.title!.length <= 0 && 'is-invalid';
    }, [formValues.title, formSubmitted]);

    const onCloseModal = () => {
        closeDateModal();
        setFormSubmitted(false);
    };

    const onInputChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormValues((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    const onDateChange = (event: Date, changing: 'start' | 'end') => {
        setFormValues((prev) => ({
            ...prev,
            [changing]: event,
            end:
                changing === 'start' && event > formValues.end!
                    ? addHours(event, 1)
                    : event,
        }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true);
        const difference = differenceInSeconds(
            formValues.end!,
            formValues.start!
        );
        if (isNaN(difference) || difference <= 0) {
            Swal.fire(
                'Fechas incorrectas',
                'Revisar las fechas ingresadas',
                'error'
            );
            return;
        }
        if (formValues.title!.length <= 0) return;

        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmitted(false);
    };

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName={'modal-fondo'}
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className='container' onSubmit={onSubmit}>
                <div className='form-group mb-2'>
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={(date: Date) => onDateChange(date, 'start')}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <div className='form-group mb-2'>
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(date: Date) => onDateChange(date, 'end')}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className='form-group mb-2'>
                    <label>Titulo y notas</label>
                    <input
                        type='text'
                        className={`form-control ${titleClass}`}
                        placeholder='T??tulo del evento'
                        autoComplete='off'
                        name='title'
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id='emailHelp' className='form-text text-muted'>
                        Una descripci??n corta
                    </small>
                </div>

                <div className='form-group mb-2'>
                    <textarea
                        className='form-control'
                        placeholder='Notas'
                        rows={5}
                        name='notes'
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id='emailHelp' className='form-text text-muted'>
                        Informaci??n adicional
                    </small>
                </div>

                <button
                    type='submit'
                    className='btn btn-outline-primary btn-block'
                >
                    <i className='far fa-save'></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    );
};
