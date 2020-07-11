import axios from 'axios';

const sendEmail = async (formData) => {
  // get data from user input to send post request//
  // const {fullName, email, message} = formData
  // make http request to gcp serverless micro-service with axios//
  axios.post('', formData)
  .then((response) => {
    console.log('This is response from rs-mailing-serivice', response )
  })
  .catch((error) => {
    console.log('Error from rs-mailing-service', error)
  })
  // check response for user feedback//
}

        


export default sendEmail