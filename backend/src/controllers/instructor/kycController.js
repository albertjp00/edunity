const kycServices = require('../../services/instructor/kycServices')


const kycSubmit = async (req,res)=>{
    try {

        const idProof = req.files['idProof']?.[0]
        const addressProof = req.files['addressProof']?.[0]

        const authHeader = req.headers['authorization']
        const token  = authHeader && authHeader.split(' ')[1]
        console.log('kyc submit ',idProof,addressProof);



        const result = await kycServices.kycSubmit(idProof.filename,addressProof.filename,token)
        
        if (result) {
      return res.json({ success: true, message: 'KYC submitted successfully' });
    } else {
      return res.status(500).json({ success: false, message: 'Failed to submit KYC' });
    }

    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {kycSubmit}