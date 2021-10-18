import {useRouter} from 'next/router'
import {useDispatch, useSelector} from 'react-redux'

import {toast} from 'react-toastify'
import {setCurrentModalAction, setResetTokenAction} from 'store'


const ResetPage = ({token, status}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const translation = useSelector(state => state.currentTranslation)

  if (status === 200) {
    dispatch(setResetTokenAction(token))
    router.push('/')
    dispatch(setCurrentModalAction('modal-pass'))
  } else {
    router.push('/')
    toast.error(translation.popupMessages.somethingWentWrong, {theme: 'colored'})
  }

  return null
}

export async function getServerSideProps(context) {
  const resetResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/reset/password/${context.params.token}`)

  return {
    props: {
      token: context.params.token,
      status: resetResponse.status
    }
  }
}

export default ResetPage
