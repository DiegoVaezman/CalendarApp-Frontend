import { onCloseDateModal, onOpenDateModal } from '../store';
import { useAppDispatch, useAppSelector } from './reduxToolkit';


export const useUiStore = () => {

    const dispatch = useAppDispatch();

    const {isDateModalOpen} = useAppSelector(state => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal());
    }
    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    }
    const toggleDateModal = () => {
        isDateModalOpen
        ? closeDateModal()
        : openDateModal()
    }

    return {
        isDateModalOpen,
        openDateModal,
        closeDateModal,
        toggleDateModal
    }
};