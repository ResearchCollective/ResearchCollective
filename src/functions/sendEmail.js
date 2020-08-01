import axios from 'axios';

const sendEmail = async (formData) => {
  // get data from user input to send post request//
  // const {fullName, email, message} = formData
  // make http request to gcp serverless micro-service with axios//
  axios.post(`${process.env.REACT_APP_RS_MAILING_SERVICE}`, formData, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => {
    console.log('This is response from rs-mailing-serivice', response)
  })
  .catch((error) => {
    console.log('Error from rs-mailing-service', error)
  })
  // check response for user feedback//
}

        


export default sendEmail