import {Transition} from 'react-transition-group'

import * as Styles from './styles'
import LoginModal from 'components/Modals/LoginModal'
import RegisterModal from 'components/Modals/RegisterModal'
import EmailModal from 'components/Modals/EmailModal'
import PassModal from 'components/Modals/PassModal'


const ModalsManager = ({closeFn, modal = ''}) => {
  const modals = [
    {
      modalName: 'modal-login',
      modalComponent: LoginModal
    },
    {
      modalName: 'modal-register',
      modalComponent: RegisterModal
    },
    {
      modalName: 'modal-email',
      modalComponent: EmailModal
    },
    {
      modalName: 'modal-pass',
      modalComponent: PassModal
    },
  ]
  return (
    <>
      <Styles.ModalMask open={modal !== ''} onClick={closeFn} />
      {modals.map((singleModal) => (
        <Transition
          key={singleModal.modalName}
          in={modal === singleModal.modalName}
          appear={modal === singleModal.modalName}
          timeout={200}
          unmountOnExit
          mountOnEnter>
          {(state) => (
            <singleModal.modalComponent closeFn={closeFn} state={state} />
          )}
        </Transition>
      ))}
    </>
  )
}

export default ModalsManager
