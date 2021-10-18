import {useSelector} from 'react-redux'

import * as Styles from 'styles/confirmationStyles'
import Seo from 'components/Seo'
import Layout from 'layout'
import BaseContainer from 'components/BaseContainer'
import Typography from 'components/Typography'

import Confirmed from '../../../images/confirmed.svg'
import Denied from '../../../images/access-denied.svg'


const ConfirmationPage = ({status}) => {
  const translation = useSelector(state => state.currentTranslation)

  return (
    <>
      <Seo />
      <Layout>
        <Styles.ConfirmationContainer>
          <BaseContainer>
            {status === 200 ? (
              <>
                <Confirmed />
                <Typography size={5} fontWeight={600}>{translation.confirmationPage.accountConfirmed}</Typography>
                <Typography size={5} fontWeight={600}>{translation.confirmationPage.canCloseWindow}</Typography>
              </>
            ) : (
              <>
                <Denied />
                <Typography size={5} fontWeight={600}>
                  {translation.confirmationPage.accountNotConfirmed}
                </Typography>
              </>
            )}
          </BaseContainer>
        </Styles.ConfirmationContainer>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const activationResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/activate/${context.params.token}`)

  return {
    props: {
      status: activationResponse.status
    }
  }
}

export default ConfirmationPage
