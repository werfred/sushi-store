import * as Styles from '../../../styles/confirmationStyles'
import Seo from '../../../components/Seo'
import Layout from '../../../layout'
import BaseContainer from '../../../components/BaseContainer'
import Typography from '../../../components/Typography'

import Confirmed from '../../../images/confirmed.svg'
import Denied from '../../../images/access-denied.svg'


const ConfirmationPage = ({status}) => {
  return (
    <>
      <Seo />
      <Layout>
        <Styles.ConfirmationContainer>
          <BaseContainer>
            {status === 200 ? (
              <>
                <Confirmed />
                <Typography size={5} fontWeight={600}>Аккаунт успішно підтверджено</Typography>
                <Typography size={5} fontWeight={600}>Можете закрити це вікно</Typography>
              </>
            ) : (
              <>
                <Denied />
                <Typography size={5} fontWeight={600}>
                  Аккаунт не було підтверджено, це посилання більше не є дійсним
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
